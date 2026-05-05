import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-[var(--ink-900)] outline-none transition focus:border-[var(--brand)]",
        className
      )}
      {...props}
    />
  );
}
