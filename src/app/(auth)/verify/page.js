import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Welcome to Mercado!",
};

export default function VerifyPage() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
          🎉
        </div>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
          You&apos;re all set
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Welcome to Mercado!</h1>
        <p className="mt-5 text-base leading-8 text-[var(--ink-700)]">
          Your account has been created successfully. You can now browse products,
          save your favorites, and place orders — all from your account.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink-900)] px-6 py-3 text-sm font-semibold text-white! transition hover:bg-[var(--brand-deep)]"
          >
            Start shopping
          </Link>

        </div>
      </Card>
    </div>
  );
}