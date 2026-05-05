import { z } from "zod";
import {
  removeCartItem,
  updateCartItem,
} from "@/features/cart/services/cart-service";
import { requireApiUser } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeCart } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

const quantitySchema = z.object({
  quantity: z.coerce.number().int().min(1),
});

export async function PUT(request, { params }) {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const { id } = await params;
    const parsed = quantitySchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid quantity payload.", 422, parsed.error.flatten());
    }

    const cart = await updateCartItem(user.id, id, parsed.data.quantity);
    return createApiResponse(serializeCart(cart));
  });
}

export async function DELETE(_request, { params }) {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const { id } = await params;
    const cart = await removeCartItem(user.id, id);
    return createApiResponse(serializeCart(cart));
  });
}
