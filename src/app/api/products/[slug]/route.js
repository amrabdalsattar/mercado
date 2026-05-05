import { productCreateSchema } from "@/features/products/schemas/product-schemas";
import {
  deleteProduct,
  getProductBySlug,
  updateProduct,
} from "@/features/products/services/product-service";
import { requireApiRole } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeProduct } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function GET(_request, { params }) {
  return withApiErrorBoundary(async () => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return createApiError("Product not found", 404);
    }

    return createApiResponse(serializeProduct(product));
  });
}

export async function PUT(request, { params }) {
  return withApiErrorBoundary(async () => {
    await requireApiRole("SELLER");
    const { slug } = await params;
    const parsed = productCreateSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid product payload.", 422, parsed.error.flatten());
    }

    const product = await updateProduct(slug, parsed.data);
    if (!product) {
      return createApiError("Product not found", 404);
    }

    return createApiResponse(serializeProduct(product));
  });
}

export async function DELETE(_request, { params }) {
  return withApiErrorBoundary(async () => {
    await requireApiRole("SELLER");
    const { slug } = await params;
    const product = await deleteProduct(slug);

    if (!product) {
      return createApiError("Product not found", 404);
    }

    return createApiResponse({ success: true });
  });
}
