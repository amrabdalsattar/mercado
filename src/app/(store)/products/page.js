import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategories, queryProducts } from "@/lib/mock-data";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductsGrid } from "@/features/products/components/products-grid";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    q: params.q ?? "",
    category: params.category ?? "",
    sort: params.sort ?? "featured",
    availability: params.availability ?? "",
    price: params.price ?? "",
  };

  const categories = getCategories();
  const products = queryProducts(filters);

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

        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
