import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-(--line)] bg-white/80 px-4 py-3 text-sm text-(--ink-900)] outline-none transition focus:border-(--brand)]",
        className
      )}
      {...props}
    />
  );
}
