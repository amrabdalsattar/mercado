import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
        <form className="mt-8 grid gap-4">
          <Input type="email" placeholder="Email or phone" />
          <Input type="password" placeholder="Password" />
          <Button type="button" className="w-full">
            Continue
          </Button>
        </form>
        <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
          Auth providers and verification can plug into this screen without changing the layout
          contract.
        </p>
      </Card>
    </div>
  );
}
