import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { listCategories, listProducts } from "@/features/products/services/product-service";
import { serializeCategory, serializeProduct } from "@/lib/serializers";
import { safeDbCall } from "@/lib/safe-db";

export const metadata = {
  title: "Shop All Products — Mercado",
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
        eyebrow="All products"
        title="Find exactly what you're looking for."
        copy="Browse our full catalog and use the filters below to narrow things down by category, price, or availability."
      />

      <div className="mt-8 grid gap-6">
        <ProductFilters filters={filters} categories={categories} />

        <Card className="flex items-center justify-between gap-4 p-5 text-sm text-[var(--ink-700)]">
          <p>
            {products.length > 0
              ? `Showing ${products.length} ${products.length === 1 ? "product" : "products"}`
              : "No products found"}
            {filters.q ? ` for "${filters.q}"` : ""}
            {filters.category ? ` in ${filters.category.replace(/-/g, " ")}` : ""}
          </p>
          <p className="capitalize">Sorted by: {filters.sort.replace("-", " ")}</p>
        </Card>

        {products.length ? (
          <ProductsGrid products={products} />
        ) : (
          <Card className="p-10 text-center text-[var(--ink-700)]">
            <p className="text-lg font-semibold text-[var(--ink-900)]">No products found</p>
            <p className="mt-2 text-sm leading-7">
              We couldn&apos;t find anything matching your search. Try adjusting your filters or
              searching for something different.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}