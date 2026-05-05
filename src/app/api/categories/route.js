import { getCategories } from "@/lib/mock-data";
import { createApiResponse } from "@/services/api-response";

export async function GET() {
  const categories = getCategories();
  return createApiResponse(categories, { count: categories.length });
}
