import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, copy, className }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow ? <Badge className="w-fit">{eyebrow}</Badge> : null}
      <div className="space-y-3">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {copy ? (
          <p className="max-w-2xl text-base leading-7 text-(--ink-700)]">
            {copy}
          </p>
        ) : null}
      </div>
    </div>
  );
}
