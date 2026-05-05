import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/features/products/components/product-card";
import {
  listCategories,
  listFeaturedProducts,
} from "@/features/products/services/product-service";
import { serializeCategory, serializeProduct } from "@/lib/serializers";
import { safeDbCall } from "@/lib/safe-db";
import { formatCompactNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "Build a sharper workspace",
    copy: "Create the product mix that fits your audience, inventory, and merchandising strategy.",
    href: "/products",
  },
  {
    title: "Operate with real seller workflows",
    copy: "Use JWT-backed authentication to separate admin, seller, and customer responsibilities.",
    href: "/seller",
  },
  {
    title: "Track the commerce funnel",
    copy: "Catalog, cart, checkout, and order management now hang off persisted backend models.",
    href: "/admin",
  },
];

export default async function StoreHomePage() {
  const featuredProducts = await safeDbCall(
    async () => (await listFeaturedProducts()).map(serializeProduct),
    []
  );
  const categories = await safeDbCall(
    async () => (await listCategories()).map(serializeCategory),
    []
  );

  return (
    <div className="pb-16">
      <section className="shell hero-grid mt-6 overflow-hidden rounded-[40px] border border-black/5 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-deep)]">
                Full-stack marketplace blueprint
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                The storefront, seller ops, and admin command center in one clean system.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--ink-700)]">
                Mercado now uses persisted models, JWT sessions, real route handlers, and protected
                role-based dashboards instead of placeholder demo flows.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button as="link" href="/products">
                Browse products
              </Button>
              <Button as="link" href="/admin" variant="secondary">
                Open admin dashboard
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Catalog ready", value: featuredProducts.length || "0" },
                { label: "Shoppers served", value: formatCompactNumber(18420) },
                { label: "Categories live", value: categories.length || "0" },
              ].map((item) => (
                <Card key={item.label} className="p-5">
                  <p className="text-sm text-[var(--ink-500)]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden rounded-[34px] p-2">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#1a140f_0%,#4c2c1a_45%,#c8643b_100%)] p-8 text-white">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
                <span>Production surface</span>
                <span>JWT + MongoDB</span>
              </div>
              <div className="mt-10 space-y-4">
                <h2 className="text-3xl font-semibold">
                  Real persistence, protected sessions, and clickable operations.
                </h2>
                <p className="text-sm leading-7 text-white/75">
                  Sellers can publish inventory, customers can add to cart and place orders, and
                  admins can manage categories and fulfillment states.
                </p>
              </div>
              <div className="mt-10 grid gap-3">
                {[
                  "JWT cookies for auth and RBAC-aware dashboards",
                  "MongoDB-backed products, categories, carts, and orders",
                  "Live forms and route handlers replacing placeholder controls",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Collections"
          title="Merchandising blocks built for discovery, not just a product grid."
          copy="Each section is reusable and ready to bind to CMS, category data, or promotions without changing the page composition."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Card key={collection.title} className="p-6">
              <p className="text-sm text-[var(--ink-500)]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">{collection.copy}</p>
              <Button as="link" href={collection.href} variant="ghost" className="mt-6 px-0">
                Explore collection
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Featured products"
          title="High-intent inventory with pricing, ratings, and seller-ready metadata."
        />
        {featuredProducts.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-[var(--ink-700)]">
            No products are live yet. Sign in as a seller to create your first listing.
          </Card>
        )}
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Categories"
          title="Commerce domains modeled for filtering, merchandising, and future hierarchy."
        />
        {categories.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
                  {category.slug}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{category.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">
                  {category.description || "Structured category ready for product assignments."}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-[var(--ink-700)]">
            No categories exist yet. Admins can create them from the dashboard.
          </Card>
        )}
      </section>
    </div>
  );
}
