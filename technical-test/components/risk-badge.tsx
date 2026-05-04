import { cn } from "@/lib/utils";
import { riskLabels, type RiskLevelValue } from "@/lib/validators";

const riskStyles: Record<RiskLevelValue, string> = {
  GREEN: "border-emerald-200 bg-emerald-50 text-emerald-700",
  YELLOW: "border-amber-200 bg-amber-50 text-amber-700",
  RED: "border-red-200 bg-red-50 text-red-700",
};

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevelValue;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        riskStyles[level],
        className,
      )}
    >
      {riskLabels[level]}
    </span>
  );
}
