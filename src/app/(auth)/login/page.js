import { Card } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/auth-form";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-lg p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
          Sign in
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Access your Mercado workspace.</h1>
        <AuthForm mode="login" />
        <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
          Authentication now uses a signed JWT cookie so the storefront, dashboards, cart, and
          orders all share a real session boundary.
        </p>
      </Card>
    </div>
  );
}
