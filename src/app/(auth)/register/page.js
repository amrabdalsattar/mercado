import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/auth-form";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Register",
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
          Create account
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Register as customer or seller.</h1>
        <AuthForm mode="register" />
      </Card>
    </div>
  );
}
