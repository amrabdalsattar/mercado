import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { listCategories, listProducts } from "@/features/products/services/product-service";
import { serializeCategory, serializeProduct } from "@/lib/serializers";
import { safeDbCall } from "@/lib/safe-db";

export const metadata = {
  title: "Products",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    q: params.q ?? "",
    category: params.category ?? "",
    sort: params.sort ?? "featured",
    availability: params.availability ?? "",
    price: params.price ?? "",
  };

  const categories = await safeDbCall(
    async () => (await listCategories()).map(serializeCategory),
    []
  );
  const products = await safeDbCall(
    async () => (await listProducts(filters)).map(serializeProduct),
    []
  );

  return (
    <div className="shell py-12">
      <SectionHeading
        eyebrow="Catalog"
        title="Searchable inventory with clean server-side filters."
        copy="This route is shaped for eventual database-backed pagination and richer filters while staying simple and readable today."
      />

      <div className="mt-8 grid gap-6">
        <ProductFilters filters={filters} categories={categories} />

        <Card className="flex items-center justify-between gap-4 p-5 text-sm text-[var(--ink-700)]">
          <p>{products.length} products matched your filters.</p>
          <p>Sort: {filters.sort.replace("-", " ")}</p>
        </Card>

        {products.length ? (
          <ProductsGrid products={products} />
        ) : (
          <Card className="p-6 text-[var(--ink-700)]">
            No products matched your current filters. If this is a fresh install, create one from
            the seller dashboard first.
          </Card>
        )}
      </div>
    </div>
  );
}
