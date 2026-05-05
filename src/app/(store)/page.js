import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCategories,
  getFeaturedCollections,
  getFeaturedProducts,
} from "@/lib/mock-data";
import { ProductCard } from "@/features/products/components/product-card";
import { formatCompactNumber } from "@/lib/utils";

export default function StoreHomePage() {
  const featuredProducts = getFeaturedProducts();
  const collections = getFeaturedCollections();
  const categories = getCategories();

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
                Mercado is structured like a real commerce platform: catalog discovery,
                merchandising, checkout, vendor workflows, and admin visibility.
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
                { label: "GMV tracked", value: "$1.8M" },
                { label: "Shoppers served", value: formatCompactNumber(18420) },
                { label: "Seller SLAs", value: "98.1%" },
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
                <span>Featured stack</span>
                <span>Scalable by design</span>
              </div>
              <div className="mt-10 space-y-4">
                <h2 className="text-3xl font-semibold">
                  Hybrid rendering for commerce that stays fast under growth.
                </h2>
                <p className="text-sm leading-7 text-white/75">
                  Feature modules, shared UI, route handlers, and clear data contracts
                  make it easy to move from mock services to MongoDB, auth, and payments.
                </p>
              </div>
              <div className="mt-10 grid gap-3">
                {[
                  "Storefront with filtering and product detail routes",
                  "Admin and seller dashboards with KPI surfaces",
                  "REST-style API handlers with consistent response shapes",
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
              <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">
                {collection.copy}
              </p>
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
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Categories"
          title="Commerce domains modeled for filtering, merchandising, and future hierarchy."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
                {category.slug}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">
                {category.image}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
