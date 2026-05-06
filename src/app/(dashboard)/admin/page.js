import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { CategoryForm } from "@/features/products/components/category-form";
import { AdminOrderStatusForm } from "@/features/orders/components/admin-order-status-form";
import { listOrdersForAdmin } from "@/features/orders/services/order-service";
import {
  listCategories,
  listProducts,
} from "@/features/products/services/product-service";
import { requireRole } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireRole("ADMIN");
  const [orders, products, categories] = await Promise.all([
    listOrdersForAdmin(),
    listProducts({}),
    listCategories(),
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const metrics = [
    { label: "Revenue", value: formatCurrency(revenue), hint: "All-time order value" },
    { label: "Orders", value: String(orders.length), hint: "Tracked in the database" },
    { label: "Products", value: String(products.length), hint: "Active catalog listings" },
    { label: "Categories", value: String(categories.length), hint: "Managed by admin" },
  ];

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
                key={order._id.toString()}
                className="rounded-2xl border-[var(--line)] bg-white/60 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order._id.toString()}</p>
                    <p className="text-sm text-[var(--ink-700)]">
                      {order.user?.name || order.shippingAddress.fullName} • {order.status}
                    </p>
                  </div>
                  <AdminOrderStatusForm
                    orderId={order._id.toString()}
                    currentStatus={order.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Create category</h2>
          <p className="mt-3 text-sm leading-7 text-[--ink-700)]">
            This form now persists category data instead of rendering a static dashboard tile.
          </p>
          <div className="mt-5">
            <CategoryForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
