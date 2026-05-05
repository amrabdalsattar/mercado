import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getProductBySlug,
  getRelatedProducts,
  getSellers,
} from "@/lib/mock-data";
import { ProductCard } from "@/features/products/components/product-card";
import { formatCurrency } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const seller = getSellers().find((entry) => entry.id === product.sellerId);
  const relatedProducts = getRelatedProducts(product.categoryId, product.slug);
  const price = product.salePrice ?? product.price;

  return (
    <div className="shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className={`overflow-hidden rounded-[36px] bg-gradient-to-br ${product.accent} p-8`}>
          <div className="flex h-full min-h-[480px] flex-col justify-between">
            <Badge className="w-fit bg-white/80">{product.badge}</Badge>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--ink-700)]">
                {product.category}
              </p>
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-balance">
                {product.name}
              </h1>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="p-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{product.category}</Badge>
              <Badge>{product.stock} units available</Badge>
              <Badge>{product.rating} star average</Badge>
            </div>
            <p className="mt-5 text-4xl font-semibold">{formatCurrency(price)}</p>
            {product.salePrice ? (
              <p className="mt-1 text-base text-[var(--ink-500)] line-through">
                {formatCurrency(product.price)}
              </p>
            ) : null}
            <p className="mt-5 text-base leading-8 text-[var(--ink-700)]">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button as="link" href="/cart">
                Add to cart
              </Button>
              <Button as="link" href="/checkout" variant="secondary">
                Buy now
              </Button>
            </div>
          </Card>

          <Card className="p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
              Product specs
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec}
                  className="rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3 text-sm"
                >
                  {spec}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
              Seller snapshot
            </p>
            <h2 className="mt-4 text-2xl font-semibold">{seller?.name}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--ink-700)]">
              Rated {seller?.rating} with an average response time of {seller?.responseTime}.
              This layout is ready for marketplace-specific seller policy and fulfillment data.
            </p>
          </Card>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Related products"
          title="Cross-sell slots with a reusable product-card surface."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
