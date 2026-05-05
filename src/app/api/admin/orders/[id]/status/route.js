import { orderStatusSchema } from "@/features/orders/schemas/order-schemas";
import { updateOrderStatus } from "@/features/orders/services/order-service";
import { requireApiRole } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeOrder } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function PUT(request, { params }) {
  return withApiErrorBoundary(async () => {
    await requireApiRole("ADMIN");
    const { id } = await params;
    const parsed = orderStatusSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid order status.", 422, parsed.error.flatten());
    }

    const order = await updateOrderStatus(id, parsed.data.status);
    return createApiResponse(serializeOrder(order));
  });
}
