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
    return { title: "Product not found — Mercado" };
  }

  return {
    title: `${product.name} — Mercado`,
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
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <div className="shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden rounded-[36px] bg-linear-to-br from-(--surface-2) via-white to-(--surface-1) p-8">
          <div className="flex h-full min-h-120 flex-col justify-between">
            {product.coverImage ? (
              <div className="relative mb-6 flex-1 overflow-hidden rounded-3xl">
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
              {product.featured ? "⭐ Featured pick" : product.category || "Product"}
            </Badge>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.22em] text-(--ink-700)">
                {product.category || "General"}
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
              {product.category ? <Badge>{product.category}</Badge> : null}
              {product.stock > 0 ? (
                <Badge className="bg-green-50 text-green-700">
                  {product.stock} in stock
                </Badge>
              ) : (
                <Badge className="bg-red-50 text-red-600">Out of stock</Badge>
              )}
              {product.ratings?.average > 0 ? (
                <Badge>⭐ {product.ratings.average} / 5</Badge>
              ) : null}
              {discount ? (
                <Badge className="bg-orange-50 text-orange-600">{discount}% off</Badge>
              ) : null}
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-4xl font-semibold">{formatCurrency(price)}</p>
              {product.salePrice ? (
                <p className="mb-1 text-base text-(--ink-500) line-through">
                  {formatCurrency(product.price)}
                </p>
              ) : null}
            </div>

            <p className="mt-5 text-base leading-8 text-(--ink-700)">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <AddToCartButton productId={product.id} />
              <Button as="link" href="/checkout" variant="secondary">
                Buy now
              </Button>
            </div>

            <p className="mt-4 text-xs text-(--ink-500)">
              Secure checkout — your payment info is always protected.
            </p>
          </Card>

          <Card className="p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-(--brand-deep)">
              Product details
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                product.stock > 0
                  ? `✓ ${product.stock} units available`
                  : "✗ Currently out of stock",
                product.category
                  ? `Category: ${product.category}`
                  : "Category: General",
                `Sold by: ${product.sellerName || "Mercado seller"}`,
                product.featured
                  ? "⭐ Featured product"
                  : "✓ Verified listing",
              ].map((spec) => (
                <div
                  key={spec}
                  className="rounded-2xl border border-(--line) bg-white/60 px-4 py-3 text-sm"
                >
                  {spec}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-(--brand-deep)">
              About the seller
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              {product.sellerName || "Mercado seller"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-(--ink-700)">
              This product is sold by a verified seller on Mercado. All listings
              are reviewed to ensure quality and accuracy before going live.
            </p>
          </Card>
        </div>
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="You might also like"
          title="More products from this category."
        />
        {relatedProducts.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-6 text-(--ink-700)">
            No related products yet — check back soon as more items are added.
          </Card>
        )}
      </section>
    </div>
  );
}