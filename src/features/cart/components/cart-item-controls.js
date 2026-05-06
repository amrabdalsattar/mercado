"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartItemControls({ itemId, quantity, maxStock }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function updateQuantity(nextQuantity) {
    setPending(true);
    await fetch(`/api/cart/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: nextQuantity }),
    });
    router.refresh();
  }

  async function removeItem() {
    setPending(true);
    await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <select
        defaultValue={String(quantity)}
        disabled={pending}
        onChange={(event) => updateQuantity(Number(event.target.value))}
        className="rounded-full border-[var(--line)] bg-white px-3 py-2 text-sm"
      >
        {Array.from({ length: Math.max(1, Math.min(maxStock, 10)) }, (_, index) => index + 1).map(
          (value) => (
            <option key={value} value={value}>
              Qty {value}
            </option>
          )
        )}
      </select>
      <button
        type="button"
        disabled={pending}
        onClick={removeItem}
        className="text-sm font-medium text-[var(--brand-deep)]"
      >
        Remove
      </button>
    </div>
  );
}
