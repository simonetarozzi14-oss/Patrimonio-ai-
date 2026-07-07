import { patrimonioTotale } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function TreeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-cream-dark)] bg-gradient-to-b from-[var(--color-forest-mist)] to-white">
      {/* anelli concentrici decorativi, come anelli di crescita */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full border border-[var(--color-cream-dark)]/70" />
        <div className="absolute h-[380px] w-[380px] rounded-full border border-[var(--color-cream-dark)]/70" />
        <div className="absolute h-[240px] w-[240px] rounded-full border border-[var(--color-cream-dark)]/70" />
      </div>

      <div className="relative flex flex-col items-center px-6 pt-12 pb-8 sm:pt-16">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">
          Il tuo albero patrimoniale
        </span>

        <svg
          viewBox="0 0 600 480"
          className="mt-6 h-[280px] w-auto sm:h-[340px]"
          role="img"
          aria-label="Illustrazione di un albero che rappresenta la crescita del patrimonio"
        >
          <defs>
            <radialGradient id="canopyGlow" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#3f6350" />
              <stop offset="100%" stopColor="#1f3d2e" />
            </radialGradient>
            <linearGradient id="trunkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f6350" />
              <stop offset="100%" stopColor="#142a1f" />
            </linearGradient>
          </defs>

          {/* terreno */}
          <ellipse cx="300" cy="430" rx="180" ry="14" fill="#efe7d4" />

          {/* radici */}
          <path
            d="M300 400 C 270 415, 230 415, 200 432 M300 400 C 285 418, 260 420, 235 435 M300 400 C 315 418, 340 420, 365 435 M300 400 C 330 415, 370 415, 400 432"
            stroke="#142a1f"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* tronco */}
          <path
            d="M285 400 C 280 340, 282 280, 292 230 C 296 210, 304 210, 308 230 C 318 280, 320 340, 315 400 Z"
            fill="url(#trunkGradient)"
          />

          {/* rami */}
          <path
            d="M300 260 C 270 235, 250 210, 235 175 M300 250 C 335 225, 355 195, 368 160 M300 230 C 280 205, 270 180, 268 150"
            stroke="#3f6350"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* chioma: cerchi organici sovrapposti */}
          <g>
            <circle cx="300" cy="165" r="118" fill="url(#canopyGlow)" />
            <circle cx="205" cy="205" r="72" fill="#2f5641" opacity="0.9" />
            <circle cx="400" cy="200" r="78" fill="#2f5641" opacity="0.9" />
            <circle cx="300" cy="110" r="80" fill="#3f6350" opacity="0.85" />
          </g>

          {/* frutti dorati: gli asset che compongono il patrimonio */}
          <g fill="#c6a15b">
            <circle cx="230" cy="150" r="7" />
            <circle cx="360" cy="140" r="6" />
            <circle cx="300" cy="90" r="6" />
            <circle cx="250" cy="220" r="6" />
            <circle cx="370" cy="230" r="7" />
            <circle cx="320" cy="200" r="5" />
            <circle cx="200" cy="180" r="5" />
          </g>
        </svg>

        <p className="font-display text-xl text-[var(--color-forest-dark)] text-center max-w-md mt-2">
          Radicato nel presente, in crescita verso il futuro.
        </p>

        <div className="mt-6 flex flex-col items-center">
          <span className="text-sm text-[var(--color-muted)]">
            Patrimonio totale
          </span>
          <span className="font-display text-4xl sm:text-5xl text-[var(--color-forest-dark)] mt-1">
            {formatCurrency(patrimonioTotale.valore, patrimonioTotale.valuta)}
          </span>
        </div>
      </div>
    </section>
  );
}
