import { categoryCreateSchema } from "@/features/products/schemas/product-schemas";
import { createCategory, listCategories } from "@/features/products/services/product-service";
import { requireApiRole } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeCategory } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function GET() {
  return withApiErrorBoundary(async () => {
    const categories = (await listCategories()).map(serializeCategory);
    return createApiResponse(categories, { count: categories.length });
  });
}

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    await requireApiRole("ADMIN");
    const parsed = categoryCreateSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid category payload.", 422, parsed.error.flatten());
    }

    const category = await createCategory(parsed.data);
    return createApiResponse(serializeCategory(category), {}, null, { status: 201 });
  });
}
