import { getOrders } from "@/lib/mock-data";
import { createApiResponse } from "@/services/api-response";

export async function GET() {
  const orders = getOrders();
  return createApiResponse(orders, { count: orders.length });
}
