"use client";

type Props = {
  onAumentaPac: (importo: number) => void;
  onCambiaAnni: (delta: number) => void;
};

const AZIONI_PAC = [100, 250, 500];
const AZIONI_ANNI = [5, -5];

export function CosaSuccedeSe({ onAumentaPac, onCambiaAnni }: Props) {
  return (
    <section
      className="rounded-3xl border border-[var(--color-cream-dark)]/80 bg-white
                 px-5 py-5 sm:px-7 sm:py-7
                 shadow-[0_1px_2px_rgba(31,61,46,0.03),0_1px_1px_rgba(31,61,46,0.02)]"
    >
      <h2 className="text-sm font-medium tracking-wide text-[var(--color-muted)]">
        Cosa succede se...
      </h2>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {AZIONI_PAC.map((importo) => (
          <button
            key={importo}
            type="button"
            onClick={() => onAumentaPac(importo)}
            className="rounded-full border border-[var(--color-cream-dark)] bg-[var(--color-cream)]
                       px-3 py-2.5 text-xs font-medium text-[var(--color-forest-dark)]
                       transition-colors hover:bg-[var(--color-forest-mist)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            +{importo} €/mese
          </button>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {AZIONI_ANNI.map((delta) => (
          <button
            key={delta}
            type="button"
            onClick={() => onCambiaAnni(delta)}
            className="rounded-full border border-[var(--color-cream-dark)] bg-[var(--color-cream)]
                       px-3 py-2.5 text-xs font-medium text-[var(--color-forest-dark)]
                       transition-colors hover:bg-[var(--color-forest-mist)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            {delta > 0 ? `+${delta}` : delta} anni
          </button>
        ))}
      </div>
    </section>
  );
}
