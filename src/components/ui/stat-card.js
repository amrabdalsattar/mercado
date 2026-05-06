import { Card } from "@/components/ui/card";

export function StatCard({ label, value, hint }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-(--ink-500)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-(--success)]">{hint}</p>
    </Card>
  );
}
