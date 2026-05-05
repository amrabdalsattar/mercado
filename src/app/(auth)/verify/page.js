import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Verify account",
};

export default function VerifyPage() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-xl p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
          Verify account
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Check your inbox or phone for a code.</h1>
        <p className="mt-5 text-base leading-8 text-[var(--ink-700)]">
          This route is reserved for email and phone verification as the auth system expands.
        </p>
      </Card>
    </div>
  );
}
