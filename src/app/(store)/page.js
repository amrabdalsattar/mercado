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
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "Find what you love",
    copy: "Browse thousands of products across every category — from everyday essentials to things you didn't know you needed.",
    href: "/products",
  },
  {
    title: "Sell with confidence",
    copy: "Got something to sell? Set up your store in minutes and reach customers who are ready to buy.",
    href: "/seller",
  },
  {
    title: "Always know where your order is",
    copy: "From the moment you check out to the day it arrives at your door — we keep you in the loop every step of the way.",
    href: "/orders",
  },
];

export default async function StoreHomePage() {
  const session = await getSession();
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
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-(--brand-deep)]">
                Your everyday marketplace
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                Everything you need, all in one place.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-(--ink-700)]">
                Shop from hundreds of sellers, discover great deals, and get your orders delivered
                fast. Whether you&apos;re buying or selling — Mercado makes it simple.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="text-white bg-(--ink-900) rounded-3xl">
                <Button as="link" href="/products">
                  Shop now
                </Button>
              </div>

              {!session?.user ? (
                <Button as="link" href="/register" variant="secondary">
                  Join for free
                </Button>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Products available", value: featuredProducts.length || "0" },
                { label: "Happy shoppers", value: formatCompactNumber(18420) },
                { label: "Categories to explore", value: categories.length || "0" },
              ].map((item) => (
                <Card key={item.label} className="p-5">
                  <p className="text-sm text-(--ink-500)]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden rounded-[34px] p-2">
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#1a140f_0%,#4c2c1a_45%,#c8643b_100%)] p-8 text-white">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
                <span>Why shop with us</span>
                <span>Safe & secure</span>
              </div>
              <div className="mt-10 space-y-4">
                <h2 className="text-3xl font-semibold">
                  Shopping that&apos;s fast, safe, and actually enjoyable.
                </h2>
                <p className="text-sm leading-7 text-white/75">
                  We handle the hard parts — secure payments, order tracking, and a trusted seller
                  network — so you can focus on finding things you love.
                </p>
              </div>
              <div className="mt-10 grid gap-3">
                {[
                  "Your account and payments are always protected",
                  "Sellers are verified before they can list products",
                  "Easy returns and order support whenever you need it",
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
          eyebrow="What we offer"
          title="More than a store — a better way to shop and sell."
          copy="Whether you're looking for the best deal or building your own business, Mercado gives you the tools to make it happen."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Card key={collection.title} className="p-6">
              <p className="text-sm text-(--ink-500)]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
              <p className="mt-3 text-sm leading-7 text-(--ink-700)]">{collection.copy}</p>
              <Button as="link" href={collection.href} variant="ghost" className="mt-6 px-0">
                Learn more
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Featured products"
          title="Hand-picked favorites our shoppers love right now."
        />
        {featuredProducts.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-(--ink-700)]">
            No featured products yet — check back soon or browse all categories.
          </Card>
        )}
      </section>

      <section className="shell mt-20">
        <SectionHeading
          eyebrow="Shop by category"
          title="Not sure where to start? Pick a category and explore."
        />
        {categories.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-(--brand-deep)]">
                  {category.slug.replace(/-/g, " ")}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{category.name}</h3>
                <p className="mt-3 text-sm leading-7 text-(--ink-700)]">
                  {category.description || "Explore products in this category."}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-(--ink-700)]">
            Categories are on their way — come back soon!
          </Card>
        )}
      </section>
    </div>
  );
}