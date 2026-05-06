import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-(--ink-900)] text-white hover:bg-(--brand-deep)] focus-visible:outline-[var(--brand)]",
  secondary:
    "bg-white/70 text-(--ink-900)] hover:bg-white focus-visible:outline-[var(--brand)]",
  ghost:
    "bg-transparent text-(--ink-700)] hover:bg-black/5 focus-visible:outline-[var(--brand)]",
};

export function Button({
  as = "button",
  href,
  variant = "primary",
  className,
  children,
  ...props
}) {
  const shared = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
    styles[variant],
    className
  );

  if (as === "link") {
    return (
      <Link href={href} className={shared} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={shared} {...props}>
      {children}
    </button>
  );
}
