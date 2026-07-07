import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Obiettivo } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function GoalCard({ obiettivo }: { obiettivo: Obiettivo }) {
  const percentuale = Math.round((obiettivo.attuale / obiettivo.target) * 100);

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-[var(--color-ink)] text-base font-display">
            {obiettivo.titolo}
          </CardTitle>
          <p className="text-sm text-[var(--color-muted)] mt-0.5">
            {obiettivo.descrizione}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-mist)] text-[var(--color-forest)]">
          <Target className="h-4 w-4" strokeWidth={2} />
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <span className="font-display text-2xl text-[var(--color-forest-dark)]">
            {formatCurrency(obiettivo.attuale)}
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            di {formatCurrency(obiettivo.target)}
          </span>
        </div>

        <Progress value={percentuale} />

        <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span>{percentuale}% raggiunto</span>
          <span>Scadenza {obiettivo.scadenza}</span>
        </div>
      </CardContent>
    </Card>
  );
}
