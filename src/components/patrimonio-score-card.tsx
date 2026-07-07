import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patrimonioScore } from "@/lib/mock-data";

export function PatrimonioScoreCard() {
  const { punteggio, scoreMassimo, livello, descrizione, variazione } =
    patrimonioScore;

  const raggio = 54;
  const circonferenza = 2 * Math.PI * raggio;
  const percentuale = punteggio / scoreMassimo;
  const offset = circonferenza * (1 - percentuale);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Patrimonio Score</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={raggio}
              fill="none"
              stroke="var(--color-cream-dark)"
              strokeWidth="10"
            />
            <circle
              cx="64"
              cy="64"
              r={raggio}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circonferenza}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 900ms ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl text-[var(--color-forest-dark)]">
              {punteggio}
            </span>
            <span className="text-xs text-[var(--color-muted)]">
              su {scoreMassimo}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="inline-flex w-fit rounded-full bg-[var(--color-forest-mist)] px-3 py-1 text-xs font-medium text-[var(--color-forest-dark)]">
            {livello}
          </span>
          <p className="text-sm text-[var(--color-ink)]">{descrizione}</p>
          <p className="text-xs text-[var(--color-gold-dark)]">{variazione}</p>
        </div>
      </CardContent>
    </Card>
  );
}
