import { getCategories, queryProducts } from "@/lib/mock-data";
import { createApiResponse } from "@/services/api-response";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    q: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    sort: searchParams.get("sort") ?? "featured",
    availability: searchParams.get("availability") ?? "",
    price: searchParams.get("price") ?? "",
  };

  const products = queryProducts(filters);

  return createApiResponse(products, {
    count: products.length,
    filters,
    categories: getCategories().length,
  });
}
