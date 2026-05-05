import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { requireUser } from "@/lib/auth";
import { CheckoutForm } from "@/features/orders/components/checkout-form";

export const metadata = {
  title: "Checkout",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await requireUser();

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Checkout"
        title="A structured checkout flow prepared for Stripe and guest conversion."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="p-6">
          <CheckoutForm userEmail={user.email} />
        </Card>

        <Card className="h-fit p-6">
          <h2 className="text-2xl font-semibold">Why this checkout scales</h2>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--ink-700)]">
            <p>Guest-friendly and easy to convert into an account after purchase.</p>
            <p>Server-side order totals and payment confirmation can be centralized cleanly.</p>
            <p>Shipping, tax, and discount calculations have a dedicated summary region.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
