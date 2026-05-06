import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/auth-form";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Create Account — Mercado",
};

export default async function RegisterPage() {
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-2xl p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
          Join Mercado
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          Create your free account.
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">
          Shop from hundreds of sellers, track your orders, and manage your
          wishlist — all in one place. Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-[var(--brand-deep)] underline-offset-4 hover:underline"
          >
            Sign in here.
          </a>
        </p>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
      </Card>
    </div>
  );
}