"use client";

import { Camera, ChevronRight, PenLine } from "lucide-react";
import { cronologiaAggiornamenti } from "@/lib/mock-data";

export function DettaglioCronologia() {
  function handleTuttaLaCronologia() {
    // TODO: quando la schermata della cronologia completa sarà disponibile,
    // sostituire con: router.push("/patrimonio/cronologia")
  }

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-6 py-6 sm:px-8 sm:py-8
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
        Cronologia
      </h2>

      <ul className="mt-4 flex flex-col">
        {cronologiaAggiornamenti.map((voce, indice) => {
          const Icona = voce.tipo === "screenshot" ? Camera : PenLine;
          const ultimo = indice === cronologiaAggiornamenti.length - 1;

          return (
            <li
              key={voce.id}
              className={`flex items-center gap-3 py-3.5 ${
                ultimo ? "" : "border-b border-[var(--color-cream-dark)]/70"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-mist)] text-[var(--color-forest)]">
                <Icona className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-ink)]">
                  {voce.data}
                </span>
                <span className="text-xs text-[var(--color-muted)]">
                  {voce.fonte}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={handleTuttaLaCronologia}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-full py-3 text-sm font-medium
                   text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest-mist)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]
                   focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Tutta la cronologia
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </section>
  );
}
