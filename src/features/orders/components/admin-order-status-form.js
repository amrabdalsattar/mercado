"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminOrderStatusForm({ orderId, currentStatus }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleChange(event) {
    setPending(true);
    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: event.target.value }),
    });
    router.refresh();
  }

  return (
    <select
      defaultValue={currentStatus}
      disabled={pending}
      onChange={handleChange}
      className="rounded-full border-[var(--line)] bg-white px-4 py-2 text-sm font-medium"
    >
      <option value="PENDING">Pending</option>
      <option value="PROCESSING">Processing</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  );
}
