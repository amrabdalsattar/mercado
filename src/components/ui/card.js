import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return (
    <div className={cn("card-surface rounded-[28px]", className)}>{children}</div>
  );
}
