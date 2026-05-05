import { getCartForUser } from "@/features/cart/services/cart-service";
import { requireApiUser } from "@/lib/auth";
import { serializeCart } from "@/lib/serializers";
import { createApiResponse, withApiErrorBoundary } from "@/services/api-response";

export async function GET() {
  return withApiErrorBoundary(async () => {
    const user = await requireApiUser();
    const cart = await getCartForUser(user.id);
    return createApiResponse(serializeCart(cart));
  });
}
