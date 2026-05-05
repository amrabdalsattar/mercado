import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { ProductCard } from "@/features/products/components/product-card";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/features/products/services/product-service";
import { serializeProduct } from "@/lib/serializers";
import { safeDbCall } from "@/lib/safe-db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await safeDbCall(async () => getProductBySlug(slug), null);

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
  const rawProduct = await safeDbCall(async () => getProductBySlug(slug), null);

  if (!rawProduct) {
    notFound();
  }

  const product = serializeProduct(rawProduct);
  const relatedProducts = await safeDbCall(
    async () =>
      (await getRelatedProducts(product.categoryId, product.id)).map(serializeProduct),
    []
  );
  const price = product.salePrice ?? product.price;

  return (
    <div className="shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[var(--surface-2)] via-white to-[var(--surface-1)] p-8">
          <div className="flex h-full min-h-[480px] flex-col justify-between">
            {product.coverImage ? (
              <div className="relative flex-1 mb-6 rounded-[24px] overflow-hidden">
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : null}

            <Badge className="w-fit bg-white/80">
              {product.featured ? "Featured" : "Product detail"}
            </Badge>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--ink-700)]">
                {product.category || "Catalog"}
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
              <AddToCartButton productId={product.id} />
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
              {[
                `${product.stock} units in stock`,
                product.category || "Unassigned category",
                product.sellerName || "Marketplace seller",
                product.featured ? "Featured merchandising slot" : "Standard catalog slot",
              ].map((spec) => (
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
            <h2 className="mt-4 text-2xl font-semibold">{product.sellerName}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--ink-700)]">
              This listing belongs to a persisted seller account and is ready for richer profile,
              fulfillment, and marketplace policy data.
            </p>
          </Card>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Related products"
          title="Cross-sell slots with a reusable product-card surface."
        />
        {relatedProducts.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-[var(--ink-700)]">
            More products will appear here once this category has additional inventory.
          </Card>
        )}
      </section>
    </div>
  );
}
