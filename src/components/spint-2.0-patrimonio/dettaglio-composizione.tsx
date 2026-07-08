"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { composizionePatrimonio } from "@/lib/mock-data";

export function DettaglioComposizione() {
  function handleAnalizzaComposizione() {
    // TODO: quando la schermata di analisi sarà disponibile,
    // sostituire con: router.push("/patrimonio/composizione")
  }

  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-6 py-6 sm:px-8 sm:py-8
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
        Composizione
      </h2>

      <div className="mt-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={composizionePatrimonio}
                dataKey="percentuale"
                nameKey="categoria"
                innerRadius={58}
                outerRadius={86}
                paddingAngle={3}
                stroke="none"
                isAnimationActive
                animationDuration={800}
              >
                {composizionePatrimonio.map((voce) => (
                  <Cell key={voce.categoria} fill={voce.colore} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col gap-2.5 w-full">
          {composizionePatrimonio.map((voce) => (
            <li
              key={voce.categoria}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-[var(--color-ink)]">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: voce.colore }}
                />
                {voce.categoria}
              </span>
              <span className="text-[var(--color-muted)] font-medium tabular-nums">
                {voce.percentuale}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleAnalizzaComposizione}
        className="mt-6 w-full rounded-full bg-[var(--color-forest)] py-3 text-sm font-medium text-white
                   transition-colors hover:bg-[var(--color-forest-dark)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]
                   focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Analizza composizione
      </button>
    </section>
  );
}
