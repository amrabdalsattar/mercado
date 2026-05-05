import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatCurrency } from "@/lib/utils";
import { requireUser } from "@/lib/auth";
import { serializeCart } from "@/lib/serializers";
import { getCartForUser } from "@/features/cart/services/cart-service";
import { CartItemControls } from "@/features/cart/components/cart-item-controls";

export const metadata = {
  title: "Cart",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const user = await requireUser();
  const cart = serializeCart(await getCartForUser(user.id));
  const items = cart.items;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 18;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Cart"
        title="A persistent cart surface ready for guest and authenticated flows."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {items.length ? (
            items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="mt-2 text-sm text-[var(--ink-700)]">
                      Product route: /products/{item.productSlug}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <p className="text-xl font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <CartItemControls
                      itemId={item.id}
                      quantity={item.quantity}
                      maxStock={item.stock}
                    />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-[var(--ink-700)]">
              Your cart is empty. Browse the catalog and add products to start checkout.
            </Card>
          )}
        </div>

        <Card className="h-fit p-6">
          <h2 className="text-2xl font-semibold">Order summary</h2>
          <div className="mt-6 grid gap-3 text-sm text-[var(--ink-700)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-[var(--line)] pt-4 text-base font-semibold text-[var(--ink-900)]">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <a
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
          >
            Continue to checkout
          </a>
        </Card>
      </div>
    </div>
  );
}
