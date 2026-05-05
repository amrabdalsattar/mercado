import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/features/auth/components/logout-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/seller", label: "Seller" },
  { href: "/admin", label: "Admin" },
];

export async function SiteHeader() {
  const session = await getSession();
  const dashboardHref =
    session?.user?.role === "ADMIN"
      ? "/admin"
      : session?.user?.role === "SELLER"
        ? "/seller"
        : "/orders";

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[color:rgba(245,239,228,0.75)] backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--ink-900)] text-sm font-bold text-white">
            M
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">
              Mercado
            </p>
            <p className="text-base font-semibold">Commerce System</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--ink-700)] transition hover:text-[var(--ink-900)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Button as="link" href={dashboardHref} variant="ghost">
                {session.user.name}
              </Button>
              <LogoutButton />
            </>
          ) : (
            <Button as="link" href="/login" variant="ghost">
              Sign in
            </Button>
          )}
          <Button as="link" href="/checkout">
            Checkout
          </Button>
        </div>
      </div>
    </header>
  );
}
