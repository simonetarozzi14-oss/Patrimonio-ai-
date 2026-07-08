import { disclaimerSimulatore, osservazionePatrimonioAI } from "@/lib/mock-data";

export function OsservazioneCard() {
  return (
    <section
      className="rounded-3xl border border-[var(--color-gold-light)]/70 bg-gradient-to-br from-white to-[var(--color-gold-light)]/20
                 px-5 py-5 sm:px-7 sm:py-7"
    >
      <span className="text-sm font-medium tracking-wide text-[var(--color-gold-dark)]">
        💡 Patrimonio AI osserva
      </span>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink)]">
        {osservazionePatrimonioAI}
      </p>
    </section>
  );
}

export function DisclaimerSimulatore() {
  return (
    <p className="text-center text-xs text-[var(--color-muted)] px-4">
      {disclaimerSimulatore}
    </p>
  );
}
