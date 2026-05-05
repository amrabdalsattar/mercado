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
    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      street: String(formData.get("street") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      zip: String(formData.get("zip") ?? "").trim(),
      country: String(formData.get("country") ?? "United States").trim() || "United States",
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        const fieldErrors = result.error?.details?.fieldErrors;
        const validationMessage = fieldErrors
          ? Object.entries(fieldErrors)
            .flatMap(([, messages]) => messages ?? [])
            .filter(Boolean)
            .join(" ")
          : null;

        setError(validationMessage || result.error?.message || "Unable to place order.");
        return;
      }

      router.push("/orders");
      router.refresh();
    } catch (err) {
      setError("Unable to place order.");
    } finally {
      setPending(false);
    }
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
