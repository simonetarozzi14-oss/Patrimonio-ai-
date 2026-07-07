import { utente } from "@/lib/mock-data";

function getSaluto() {
  const ora = new Date().getHours();
  if (ora < 5) return "Buonanotte";
  if (ora < 12) return "Buongiorno";
  if (ora < 18) return "Buon pomeriggio";
  return "Buonasera";
}

export function Header() {
  const saluto = getSaluto();
  const data = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-[var(--color-muted)] capitalize">{data}</p>
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-forest-dark)] mt-1">
          {saluto}, {utente.nome}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs text-[var(--color-muted)]">
            Ultimo accesso
          </span>
          <span className="text-sm text-[var(--color-ink)]">
            {utente.ultimoAccesso}
          </span>
        </div>
        <div className="h-11 w-11 rounded-full bg-[var(--color-forest)] text-white flex items-center justify-center font-display text-lg shrink-0">
          {utente.nome.charAt(0)}
        </div>
      </div>
    </header>
  );
}
