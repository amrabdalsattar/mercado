import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { SellerProductForm } from "@/features/products/components/seller-product-form";
import {
  listCategories,
  listProductsBySeller,
} from "@/features/products/services/product-service";
import { requireRole } from "@/lib/auth";
import { serializeCategory, serializeProduct } from "@/lib/serializers";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Seller",
};

export const dynamic = "force-dynamic";

export default async function SellerPage() {
  const user = await requireRole("SELLER");
  const [products, categories] = await Promise.all([
    listProductsBySeller(user.id),
    listCategories(),
  ]);

  const serializedProducts = products.map(serializeProduct);
  const serializedCategories = categories.map(serializeCategory);
  const revenueEstimate = serializedProducts.reduce(
    (sum, product) => sum + (product.salePrice ?? product.price) * product.stock,
    0
  );
  const metrics = [
    { label: "Catalog value", value: formatCurrency(revenueEstimate), hint: "Inventory x price" },
    { label: "Listings", value: String(serializedProducts.length), hint: "Owned by your account" },
    { label: "Categories", value: String(serializedCategories.length), hint: "Available for assignment" },
    { label: "Status", value: user.role, hint: "JWT-protected session" },
  ];

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

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold">Catalog snapshot</h2>
        <div className="mt-5 grid gap-4">
          {serializedProducts.length ? (
            serializedProducts.map((product) => (
              <div
                key={product.id}
                className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-4 sm:grid-cols-[1fr_auto_auto]"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-[var(--ink-700)]">
                    {product.stock} in stock • {product.category || "Unassigned"}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  {formatCurrency(product.salePrice ?? product.price)}
                </p>
                <a
                  href={`/products/${product.slug}`}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-center"
                >
                  View listing
                </a>
              </div>
            ))
          ) : (
            <Card className="p-5 text-[var(--ink-700)]">
              You have not created any products yet.
            </Card>
          )}
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold">Create product</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">
          This form writes directly to the catalog and appears immediately in the storefront.
        </p>
        <div className="mt-5">
          <SellerProductForm categories={serializedCategories} />
        </div>
      </Card>
      </div>
    </div>
  );
}
