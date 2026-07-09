"use client";

import { esposizioniGeografiche } from "@/lib/mock-data";

type Props = {
  paeseAttivo: string | null;
  onSelezionaPaese: (id: string) => void;
};

export function MappaInterattiva({ paeseAttivo, onSelezionaPaese }: Props) {
  function opacitaPerPercentuale(percentuale: number) {
    return Math.min(0.9, 0.32 + (percentuale / 100) * 0.95);
  }

  return (
    <div className="rounded-3xl bg-[var(--color-forest-mist)] overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
      <svg
        viewBox="0 0 100 55"
        className="h-full w-full"
        role="group"
        aria-label="Mappa del mondo con la distribuzione geografica del patrimonio"
      >
        {esposizioniGeografiche
          .filter((esposizione) => esposizione.regioniMappa.length > 0)
          .map((esposizione) =>
            esposizione.regioniMappa.map((regione, indice) => {
              const attivo = paeseAttivo === esposizione.id;
              return (
                <g
                  key={`${esposizione.id}-${indice}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${esposizione.paese}, ${esposizione.percentuale}% del patrimonio`}
                  onClick={() => onSelezionaPaese(esposizione.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelezionaPaese(esposizione.id);
                    }
                  }}
                  className="group cursor-pointer outline-none"
                >
                  {/* area di tocco più ampia, invisibile, per un target comodo su mobile */}
                  <ellipse
                    cx={regione.cx}
                    cy={regione.cy}
                    rx={regione.rx + 3}
                    ry={regione.ry + 3}
                    fill="transparent"
                  />
                  <ellipse
                    cx={regione.cx}
                    cy={regione.cy}
                    rx={regione.rx}
                    ry={regione.ry}
                    fill="var(--color-forest)"
                    opacity={opacitaPerPercentuale(esposizione.percentuale)}
                    stroke={attivo ? "var(--color-gold)" : "transparent"}
                    strokeWidth={attivo ? 1.2 : 0}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transition:
                        "transform 300ms ease-out, stroke 300ms ease-out, opacity 300ms ease-out",
                    }}
                    className="group-hover:scale-110 group-focus-visible:scale-110"
                  />
                </g>
              );
            })
          )}
      </svg>
    </div>
  );
}
