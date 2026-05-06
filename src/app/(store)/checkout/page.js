import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireUser } from "@/lib/auth";
import { CheckoutForm } from "@/features/orders/components/checkout-form";

export const metadata = {
  title: "Checkout — Mercado",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await requireUser();

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Almost there!"
        title="Complete your order."
        copy="Fill in your details below and we'll take care of the rest."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="p-6">
          <CheckoutForm userEmail={user.email} />
        </Card>

        <div className="grid gap-4 h-fit">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">You&aos;re in safe hands</h2>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--ink-700)]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-500">✓</span>
                <p>Your payment is encrypted and processed securely via Stripe.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-500">✓</span>
                <p>We never store your card details on our servers.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-500">✓</span>
                <p>You&apos;ll receive an order confirmation email as soon as your purchase goes through.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-500">✓</span>
                <p>Need help? Our support team is always happy to assist.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">Delivery & returns</h2>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--ink-700)]">
              <p>🚚 Standard delivery in 3–5 business days.</p>
              <p>⚡ Express options available at checkout.</p>
              <p>↩️ Easy returns within 30 days of delivery.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}