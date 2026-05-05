"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CheckoutForm({ userEmail = "" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error?.message ?? "Unable to place order.");
      setPending(false);
      return;
    }

    router.push("/orders");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="fullName" placeholder="Full name" required />
        <Input name="email" type="email" placeholder="Email address" defaultValue={userEmail} required />
      </div>
      <Input name="street" placeholder="Street address" required />
      <div className="grid gap-5 sm:grid-cols-3">
        <Input name="city" placeholder="City" required />
        <Input name="state" placeholder="State" required />
        <Input name="zip" placeholder="ZIP code" required />
      </div>
      <Input name="country" placeholder="Country" defaultValue="United States" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full sm:w-fit" disabled={pending}>
        {pending ? "Placing order..." : "Place order"}
      </Button>
    </form>
  );
}
