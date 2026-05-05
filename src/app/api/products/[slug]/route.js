import { getProductBySlug, getRelatedProducts } from "@/lib/mock-data";
import { createApiError, createApiResponse } from "@/services/api-response";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createApiError("Product not found", 404);
  }

  return createApiResponse({
    ...product,
    related: getRelatedProducts(product.categoryId, product.slug),
  });
}
