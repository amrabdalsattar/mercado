import { orderCreateSchema } from "@/features/orders/schemas/order-schemas";
import {
  createOrderFromCart,
  listOrdersForUser,
} from "@/features/orders/services/order-service";
import { requireApiUser } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeOrder } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function GET() {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const orders = (await listOrdersForUser(user.id)).map(serializeOrder);
    return createApiResponse(orders, { count: orders.length });
  });
}

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const parsed = orderCreateSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid checkout payload.", 422, parsed.error.flatten());
    }

    const order = await createOrderFromCart(user.id, parsed.data);
    return createApiResponse(serializeOrder(order), {}, null, { status: 201 });
  });
}
