import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { listOrdersForUser } from "@/features/orders/services/order-service";
import { requireUser } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializers";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = {
  title: "Orders",
};

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = (await listOrdersForUser(user.id)).map(serializeOrder);
  const timelineByStatus = {
    PENDING: [true, false, false, false],
    PROCESSING: [true, true, false, false],
    SHIPPED: [true, true, true, false],
    DELIVERED: [true, true, true, true],
    CANCELLED: [true, false, false, false],
  };

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Orders"
        title="Order history and fulfillment visibility in a customer-friendly layout."
      />

      <div className="mt-8 grid gap-6">
        {orders.length ? (
          orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--brand-deep)]">
                    {order.id}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {order.shippingAddress.fullName}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--ink-700)]">
                    {formatDate(order.createdAt)} • {order.items.length} items • {order.status}
                  </p>
                  <p className="mt-4 text-3xl font-semibold">
                    {formatCurrency(order.total)}
                  </p>
                </div>
                <OrderTimeline
                  steps={[
                    { label: "Order placed", complete: timelineByStatus[order.status][0] },
                    { label: "Processing", complete: timelineByStatus[order.status][1] },
                    { label: "Shipped", complete: timelineByStatus[order.status][2] },
                    { label: "Delivered", complete: timelineByStatus[order.status][3] },
                  ]}
                />
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-[var(--ink-700)]">
            You have not placed any orders yet.
          </Card>
        )}
      </div>
    </div>
  );
}
