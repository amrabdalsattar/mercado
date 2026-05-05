import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Checkout"
        title="A structured checkout flow prepared for Stripe and guest conversion."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="p-6">
          <form className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
            </div>
            <Input type="email" placeholder="Email address" />
            <Input placeholder="Street address" />
            <div className="grid gap-5 sm:grid-cols-3">
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="ZIP code" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <select className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none">
                <option>Stripe card</option>
                <option>Cash on delivery</option>
              </select>
              <Input placeholder="Promo code" />
            </div>
            <div className="rounded-[28px] border border-dashed border-[var(--line)] bg-white/50 p-5 text-sm leading-7 text-[var(--ink-700)]">
              This form is intentionally UI-first with clear boundaries for React Hook Form,
              Zod validation, Stripe Payment Intents, and order creation server actions.
            </div>
            <Button type="button" className="w-full sm:w-fit">
              Place order
            </Button>
          </form>
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
