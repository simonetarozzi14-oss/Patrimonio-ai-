"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { EsposizioneGeografica } from "@/lib/mock-data";

type Props = {
  paese: EsposizioneGeografica | null;
  onChiudi: () => void;
};

export function PaeseBottomSheet({ paese, onChiudi }: Props) {
  const aperto = paese !== null;

  useEffect(() => {
    if (!aperto) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onChiudi();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [aperto, onChiudi]);

  return (
    <>
      {/* backdrop */}
      <div
        aria-hidden="true"
        onClick={onChiudi}
        className={`fixed inset-0 z-40 bg-[var(--color-forest-dark)]/30 backdrop-blur-[2px]
                    transition-opacity duration-300 ease-out
                    ${aperto ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={paese ? `Dettaglio ${paese.paese}` : undefined}
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-2xl
                    rounded-t-3xl border-t border-[var(--color-cream-dark)] bg-white
                    px-6 pt-3 pb-8 sm:px-8
                    shadow-[0_-8px_40px_-8px_rgba(31,61,46,0.25)]
                    transition-transform duration-300 ease-out
                    ${aperto ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto h-1.5 w-10 rounded-full bg-[var(--color-cream-dark)]" />

        {paese && (
          <div className="mt-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden="true">
                  {paese.bandiera}
                </span>
                <h2 className="font-display text-2xl text-[var(--color-forest-dark)]">
                  {paese.paese}
                </h2>
              </div>
              <button
                type="button"
                onClick={onChiudi}
                aria-label="Chiudi"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-muted)]
                           transition-colors hover:bg-[var(--color-forest-mist)] hover:text-[var(--color-forest-dark)]"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--color-forest-mist)] px-4 py-3">
              <span className="text-xs text-[var(--color-muted)]">
                Esposizione totale
              </span>
              <p className="font-display text-3xl text-[var(--color-forest-dark)] tabular-nums">
                {paese.percentuale}%
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)]">
              {paese.spiegazione}
            </p>

            <h3 className="mt-5 text-xs font-medium tracking-wide text-[var(--color-muted)]">
              Strumenti che contribuiscono
            </h3>
            <ul className="mt-2.5 flex flex-col gap-2">
              {paese.strumentiPrincipali.map((strumento) => (
                <li
                  key={strumento}
                  className="flex items-center gap-2.5 rounded-xl bg-[var(--color-cream)] px-3.5 py-2.5 text-sm text-[var(--color-ink)]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  {strumento}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
