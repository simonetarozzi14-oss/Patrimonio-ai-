import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { presenzaGeografica } from "@/lib/mock-data";

export function WorldMapCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Distribuzione geografica</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative rounded-2xl bg-[var(--color-forest-mist)] overflow-hidden aspect-[16/10]">
          <svg viewBox="0 0 100 62" className="h-full w-full">
            {/* meridiani e paralleli: mappa stilizzata, non geograficamente accurata */}
            <g stroke="var(--color-cream-dark)" strokeWidth="0.4" fill="none">
              <ellipse cx="50" cy="31" rx="46" ry="26" />
              <ellipse cx="50" cy="31" rx="46" ry="14" />
              <ellipse cx="50" cy="31" rx="30" ry="26" />
              <ellipse cx="50" cy="31" rx="14" ry="26" />
              <line x1="4" y1="31" x2="96" y2="31" />
            </g>

            {presenzaGeografica.map((punto) => (
              <g key={punto.luogo}>
                <circle
                  cx={punto.coordinate.x}
                  cy={punto.coordinate.y}
                  r="6"
                  fill="var(--color-gold)"
                  opacity="0.18"
                />
                <circle
                  cx={punto.coordinate.x}
                  cy={punto.coordinate.y}
                  r="2.4"
                  fill="var(--color-forest)"
                  stroke="white"
                  strokeWidth="0.6"
                />
              </g>
            ))}
          </svg>
        </div>

        <ul className="grid grid-cols-3 gap-2">
          {presenzaGeografica.map((punto) => (
            <li key={punto.luogo} className="flex flex-col">
              <span className="text-xs text-[var(--color-muted)]">
                {punto.luogo}
              </span>
              <span className="text-sm font-medium text-[var(--color-forest-dark)]">
                {punto.percentuale}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
