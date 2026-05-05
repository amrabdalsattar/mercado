import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { getAdminMetrics, getOrders } from "@/lib/mock-data";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  const metrics = getAdminMetrics();
  const orders = getOrders();

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="A command center for marketplace health, fulfillment, and seller oversight."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Operational queue</h2>
          <div className="mt-5 grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-[var(--ink-700)]">
                      {order.customer} • {order.status}
                    </p>
                  </div>
                  <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium">
                    Update status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold">What this dashboard owns</h2>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--ink-700)]">
            <p>User moderation, role changes, and soft-delete workflows.</p>
            <p>Order tracking, fulfillment exceptions, and refund visibility.</p>
            <p>Merchandising oversight for featured products, categories, and homepage content.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
