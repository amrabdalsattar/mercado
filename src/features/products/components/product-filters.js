import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductFilters({ filters, categories }) {
  return (
    <Card className="p-5">
      <form className="grid gap-4 lg:grid-cols-4">
        <Input
          type="search"
          name="q"
          defaultValue={filters.q}
          placeholder="Search products"
        />

        <select
          name="category"
          defaultValue={filters.category}
          className="rounded-2xl border border-(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="sort"
          defaultValue={filters.sort}
          className="rounded-2xl border border-(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>

        <div className="grid gap-4 sm:grid-cols-2">
          <select
            name="availability"
            defaultValue={filters.availability}
            className="rounded-2xl border border-(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
          >
            <option value="">Availability</option>
            <option value="in-stock">In stock</option>
          </select>

          <select
            name="price"
            defaultValue={filters.price}
            className="rounded-2xl border border-(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
          >
            <option value="">Any price</option>
            <option value="under-100">Under $100</option>
            <option value="100-300">$100 - $300</option>
          </select>
        </div>
        <div className="text-white bg-(--ink-900) rounded-3xl w-35 text-center">
          <Button type="submit" className="lg:justify-self-start">
            Apply filters
          </Button>
        </div>

      </form>
    </Card>
  );
}
