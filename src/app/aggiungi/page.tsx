"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { opzioniAggiungi } from "@/lib/mock-data";

export default function AggiungiPage() {
  const [messaggioTemporaneo, setMessaggioTemporaneo] = useState<
    string | null
  >(null);

  function handleOpzioneNonAncoraDisponibile(etichetta: string) {
    setMessaggioTemporaneo(`${etichetta}: presto disponibile`);
    setTimeout(() => setMessaggioTemporaneo(null), 2000);
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-md px-5 sm:px-6 py-8 sm:py-10 pb-28">
        <header>
          <h1 className="font-display text-2xl text-[var(--color-forest-dark)]">
            Cosa vuoi aggiungere?
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            Scegli come registrare un nuovo elemento del tuo patrimonio.
          </p>
        </header>

        <div className="mt-6 flex flex-col gap-3">
          {opzioniAggiungi.map((opzione) => {
            const attiva = Boolean(opzione.href);

            const contenuto = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-mist)] text-xl">
                  <span aria-hidden="true">{opzione.emoji}</span>
                </span>
                <span className="flex-1 text-sm font-medium text-[var(--color-ink)]">
                  {opzione.etichetta}
                </span>
                {attiva ? (
                  <ChevronRight
                    className="h-4 w-4 text-[var(--color-muted)]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-[11px] text-[var(--color-muted)] shrink-0">
                    Presto disponibile
                  </span>
                )}
              </>
            );

            const classiComuni =
              "group flex w-full items-center gap-3.5 rounded-2xl border border-[var(--color-cream-dark)]/80 bg-white " +
              "px-4 py-3.5 text-left shadow-[0_1px_2px_rgba(31,61,46,0.03)] transition-all duration-300 ease-out " +
              "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(31,61,46,0.18)] " +
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]";

            if (opzione.href) {
              return (
                <Link
                  key={opzione.id}
                  href={opzione.href}
                  className={classiComuni}
                >
                  {contenuto}
                </Link>
              );
            }

            return (
              <button
                key={opzione.id}
                type="button"
                onClick={() =>
                  handleOpzioneNonAncoraDisponibile(opzione.etichetta)
                }
                className={`${classiComuni} cursor-default opacity-90`}
              >
                {contenuto}
              </button>
            );
          })}
        </div>

        {messaggioTemporaneo && (
          <div
            role="status"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-forest-dark)]
                       px-4 py-2 text-xs text-white shadow-lg transition-opacity duration-300 z-50"
          >
            {messaggioTemporaneo}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
