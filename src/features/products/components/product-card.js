import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }) {
  const price = product.salePrice ?? product.price;
  const accent = product.coverImage
    ? undefined
    : "from-[var(--surface-2)] via-white to-[var(--surface-1)]";

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-[30px]">
        <div
          className={`min-h-56 ${product.coverImage ? "bg-[var(--surface-1)]" : `bg-gradient-to-br ${accent}`} p-6 transition duration-300 group-hover:scale-[1.01]`}
        >
          <div className="flex h-full flex-col justify-between">
            <Badge className="w-fit bg-white/80">
              {product.featured ? "Featured" : "Live"}
            </Badge>
            <div className="ml-auto rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-700)]">
              {product.category || "Catalog"}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm leading-6 text-[var(--ink-700)]">
              {product.description}
            </p>
          </div>

          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">{formatCurrency(price)}</span>
                {product.salePrice ? (
                  <span className="text-sm text-[var(--ink-500)] line-through">
                    {formatCurrency(product.price)}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-[var(--ink-500)]">
                {product.rating} rating • {product.reviewsCount} reviews
              </p>
            </div>
            <p className="text-sm font-medium text-[var(--ink-700)]">{product.stock} in stock</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
