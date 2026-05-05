import { productCreateSchema, productQuerySchema } from "@/features/products/schemas/product-schemas";
import { createProduct, listProducts } from "@/features/products/services/product-service";
import { requireApiRole } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeProduct } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function GET(request) {
  return withApiErrorBoundary(async () => {
    const { searchParams } = new URL(request.url);
    const parsed = productQuerySchema.safeParse({
      q: searchParams.get("q") ?? "",
      category: searchParams.get("category") ?? "",
      sort: searchParams.get("sort") ?? "featured",
    });

    if (!parsed.success) {
      return createApiError("Invalid product filters.", 422, parsed.error.flatten());
    }

    const products = (await listProducts(parsed.data)).map(serializeProduct);

    return createApiResponse(products, {
      count: products.length,
      filters: parsed.data,
    });
  });
}

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    const user = await requireApiRole("SELLER");
    const parsed = productCreateSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid product payload.", 422, parsed.error.flatten());
    }

    const product = await createProduct(parsed.data, user.id);
    return createApiResponse(serializeProduct(product), {}, null, { status: 201 });
  });
}
