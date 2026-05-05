import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="shell flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-2xl p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-deep)]">
          Create account
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Register as customer or seller.</h1>
        <form className="mt-8 grid gap-4 sm:grid-cols-2">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Email address" />
          <Input placeholder="Phone number" />
          <select className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none">
            <option>Customer</option>
            <option>Seller</option>
          </select>
          <div className="sm:col-span-2">
            <Input type="password" placeholder="Password" />
          </div>
          <div className="sm:col-span-2">
            <Button type="button">Create account</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
