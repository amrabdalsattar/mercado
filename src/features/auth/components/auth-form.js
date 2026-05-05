"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload =
      mode === "register"
        ? {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role"),
          }
        : {
            email: formData.get("email"),
            password: formData.get("password"),
          };

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error?.message ?? "Something went wrong.");
      setPending(false);
      return;
    }

    router.push(mode === "register" ? "/verify" : "/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      {mode === "register" ? <Input name="name" placeholder="Full name" required /> : null}
      <Input name="email" type="email" placeholder="Email address" required />
      {mode === "register" ? (
        <select
          name="role"
          defaultValue="CUSTOMER"
          className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="SELLER">Seller</option>
        </select>
      ) : null}
      <Input name="password" type="password" placeholder="Password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Please wait..." : mode === "register" ? "Create account" : "Continue"}
      </Button>
    </form>
  );
}
