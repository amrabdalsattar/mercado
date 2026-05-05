import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { getFeaturedProducts, getSellerMetrics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Seller",
};

export default function SellerPage() {
  const metrics = getSellerMetrics();
  const products = getFeaturedProducts();

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Seller workspace"
        title="Inventory, sales, and fulfillment surfaces for marketplace vendors."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <Card className="mt-10 p-6">
        <h2 className="text-2xl font-semibold">Catalog snapshot</h2>
        <div className="mt-5 grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-4 sm:grid-cols-[1fr_auto_auto]"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-[var(--ink-700)]">
                  {product.stock} in stock • {product.category}
                </p>
              </div>
              <p className="text-sm font-medium">{formatCurrency(product.salePrice ?? product.price)}</p>
              <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium">
                Edit listing
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
