export function OrderTimeline({ steps }) {
  return (
    <ol className="grid gap-3">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-3">
          <span
            className={`h-3 w-3 rounded-full ${step.complete ? "bg-(--success)" : "bg-(--surface-3)"
              }`}
          />
          <span className="text-sm text-(--ink-700)">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}
