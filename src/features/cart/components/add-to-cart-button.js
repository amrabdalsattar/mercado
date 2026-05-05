"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ productId }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleAddToCart() {
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await router.push("/login");
          return;
        }

        setError(result.error?.message ?? "Unable to add this item.");
        return;
      }

      await router.push("/cart");
      router.refresh();
    } catch (err) {
      setError("Unable to add this item.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={handleAddToCart} disabled={pending}>
        {pending ? "Adding..." : "Add to cart"}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
