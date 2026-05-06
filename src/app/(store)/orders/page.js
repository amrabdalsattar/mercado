import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { listOrdersForUser } from "@/features/orders/services/order-service";
import { requireUser } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializers";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Your Orders — Mercado",
};

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  PENDING: "Order received",
  PROCESSING: "Being prepared",
  SHIPPED: "On the way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STATUS_COLOR = {
  PENDING: "text-yellow-600 bg-yellow-50",
  PROCESSING: "text-blue-600 bg-blue-50",
  SHIPPED: "text-purple-600 bg-purple-50",
  DELIVERED: "text-green-600 bg-green-50",
  CANCELLED: "text-red-600 bg-red-50",
};

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
        eyebrow={`${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
        title="Your order history."
        copy="Track your purchases and see where each delivery stands right now."
      />

      <div className="mt-8 grid gap-6">
        {orders.length ? (
          orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="font-mono text-xs text-(--ink-500)">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {order.shippingAddress.fullName}
                  </h2>
                  <p className="mt-2 text-sm text-(--ink-700)">
                    Placed on {formatDate(order.createdAt)} •{" "}
                    {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                  <p className="mt-4 text-3xl font-semibold">
                    {formatCurrency(order.total)}
                  </p>
                  <span
                    className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}
                  >
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>
                <OrderTimeline
                  steps={[
                    { label: "Order placed", complete: timelineByStatus[order.status][0] },
                    { label: "Being prepared", complete: timelineByStatus[order.status][1] },
                    { label: "Shipped", complete: timelineByStatus[order.status][2] },
                    { label: "Delivered", complete: timelineByStatus[order.status][3] },
                  ]}
                />
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-10 text-center">
            <p className="text-lg font-semibold text-(--ink-900)">No orders yet</p>
            <p className="mt-2 text-sm leading-7 text-(--ink-700)">
              You haven&apos;t placed any orders yet. Once you do, you&apos;ll be able to track them right here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-(--ink-900) px-5 py-2.5 text-sm font-semibold text-(--ink-900) transition hover:bg-(--ink-900) hover:text-white!"
            >
              Start shopping
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}