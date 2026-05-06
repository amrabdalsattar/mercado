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
  title: "Seller Dashboard — Mercado",
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

  const activeListings = serializedProducts.filter((p) => p.isActive).length;
  const outOfStock = serializedProducts.filter((p) => p.stock === 0).length;

  const metrics = [
    { label: "Estimated inventory value", value: formatCurrency(revenueEstimate), hint: "Based on current stock × price" },
    { label: "Total listings", value: String(serializedProducts.length), hint: `${activeListings} active` },
    { label: "Out of stock", value: String(outOfStock), hint: outOfStock > 0 ? "Needs restocking" : "All stocked up" },
    { label: "Account type", value: "Seller", hint: "Verified seller account" },
  ];

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Seller dashboard"
        title={`Welcome back, ${user.name?.split(" ")[0] || "there"}.`}
        copy="Manage your listings, track your inventory, and add new products — all from one place."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your listings</h2>
            <span className="text-sm text-[--ink-500)]">
              {serializedProducts.length} {serializedProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {serializedProducts.length ? (
              serializedProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-3 rounded-2xl border border-(--line) bg-white/60 px-4 py-4 sm:grid-cols-[1fr_auto_auto]"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-(--ink-700)">
                      {product.stock > 0 ? (
                        <span>{product.stock} in stock</span>
                      ) : (
                        <span className="text-red-500">Out of stock</span>
                      )}
                      {" • "}
                      {product.category || "No category"}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatCurrency(product.salePrice ?? product.price)}
                  </p>
                  <a
                    href={`/products/${product.slug}`}
                    className="rounded-full border border-(--line) px-4 py-2 text-center text-sm font-medium transition hover:border-(--ink-900)] hover:text-(--ink-900)]"
                  >
                    View listing
                  </a>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-(--line) p-8 text-center">
                <p className="font-semibold text-(--ink-900)">No listings yet</p>
                <p className="mt-2 text-sm leading-7 text-(--ink-700)">
                  Use the form on the right to create your first product. It&apso;ll show up in the
                  store instantly.
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Add a new product</h2>
          <p className="mt-3 text-sm leading-7 text-(--ink-700)">
            Fill in the details below and your product will go live in the store right away.
          </p>
          <div className="mt-5">
            <SellerProductForm categories={serializedCategories} />
          </div>
        </Card>
      </div>
    </div>
  );
}