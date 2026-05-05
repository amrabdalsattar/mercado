import { cartItemSchema } from "@/features/cart/schemas/cart-schemas";
import { addCartItem } from "@/features/cart/services/cart-service";
import { requireApiUser } from "@/lib/auth";
import { parseJson } from "@/lib/http";
import { serializeCart } from "@/lib/serializers";
import {
  createApiError,
  createApiResponse,
  withApiErrorBoundary,
} from "@/services/api-response";

export async function POST(request) {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const parsed = cartItemSchema.safeParse(await parseJson(request));

    if (!parsed.success) {
      return createApiError("Invalid cart payload.", 422, parsed.error.flatten());
    }

    const cart = await addCartItem(user.id, parsed.data.productId, parsed.data.quantity);
    return createApiResponse(serializeCart(cart), {}, null, { status: 201 });
  });
}
