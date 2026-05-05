import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getOrders } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { OrderTimeline } from "@/features/orders/components/order-timeline";

export const metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  const orders = getOrders();

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Orders"
        title="Order history and fulfillment visibility in a customer-friendly layout."
      />

      <div className="mt-8 grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--brand-deep)]">
                  {order.id}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{order.customer}</h2>
                <p className="mt-2 text-sm text-[var(--ink-700)]">
                  {order.createdAt} • {order.items} items • {order.status}
                </p>
                <p className="mt-4 text-3xl font-semibold">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <OrderTimeline steps={order.fulfillment} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
