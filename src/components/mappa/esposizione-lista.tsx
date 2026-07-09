"use client";

import { ChevronRight } from "lucide-react";
import { esposizioniGeografiche } from "@/lib/mock-data";

type Props = {
  paeseAttivo: string | null;
  onSelezionaPaese: (id: string) => void;
};

export function EsposizioneLista({ paeseAttivo, onSelezionaPaese }: Props) {
  return (
    <section>
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)] mb-3">
        Esposizione geografica
      </h2>

      <div className="flex flex-col gap-2.5">
        {esposizioniGeografiche.map((esposizione) => {
          const attivo = paeseAttivo === esposizione.id;
          return (
            <button
              key={esposizione.id}
              type="button"
              onClick={() => onSelezionaPaese(esposizione.id)}
              aria-current={attivo ? "true" : undefined}
              className={`group flex w-full items-center gap-3.5 rounded-2xl border bg-white px-4 py-3.5 text-left
                          shadow-[0_1px_2px_rgba(31,61,46,0.03)] transition-all duration-300 ease-out
                          hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(31,61,46,0.18)]
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]
                          ${
                            attivo
                              ? "border-[var(--color-gold-light)]"
                              : "border-[var(--color-cream-dark)]/80"
                          }`}
            >
              <span className="text-xl shrink-0" aria-hidden="true">
                {esposizione.bandiera}
              </span>
              <span className="flex-1 text-sm font-medium text-[var(--color-ink)]">
                {esposizione.paese}
              </span>
              <span className="text-sm font-medium text-[var(--color-forest-dark)] tabular-nums">
                {esposizione.percentuale}%
              </span>
              <ChevronRight
                className="h-4 w-4 text-[var(--color-muted)] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
