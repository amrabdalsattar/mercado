import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-xl p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-(--brand-deep)">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold">The page you wanted is not here.</h1>
        <p className="mt-5 text-base leading-8 text-(--ink-700)">
          The route may not exist yet, or the requested product slug did not match the catalog.
        </p>
        <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-(--brand-deep)">
          Return to home
        </Link>
      </Card>
    </div>
  );
}
