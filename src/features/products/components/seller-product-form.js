"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SellerProductForm({ categories }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      salePrice: formData.get("salePrice") ? Number(formData.get("salePrice")) : null,
      stock: Number(formData.get("stock")),
      categoryId: formData.get("categoryId"),
      coverImage: formData.get("coverImage"),
      featured: formData.get("featured") === "on",
    };

    try {
      const response = await fetch("/api/products", {
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

        setError(validationMessage || result.error?.message || "Unable to create product.");
        return;
      }

      form.reset();
      router.refresh();
    } catch (err) {
      setError("Unable to create product.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input name="name" placeholder="Product name" required />
      <textarea
        name="description"
        placeholder="Description"
        required
        className="min-h-28 rounded-2xl border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Input name="price" type="number" min="0" step="0.01" placeholder="Price" required />
        <Input name="salePrice" type="number" min="0" step="0.01" placeholder="Sale price" />
        <Input name="stock" type="number" min="0" placeholder="Stock" required />
      </div>
      <select
        name="categoryId"
        required
        className="rounded-2xl border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none"
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Input name="coverImage" placeholder="Cover image URL (optional)" />
      <label className="flex items-center gap-2 text-sm text-[var(--ink-700)]">
        <input type="checkbox" name="featured" />
        Mark as featured
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Create product"}
      </Button>
    </form>
  );
}
