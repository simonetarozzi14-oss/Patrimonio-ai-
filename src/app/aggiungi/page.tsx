import { Plus } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export default function AggiungiPage() {
  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 pb-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-forest-mist)] text-[var(--color-forest)]">
          <Plus className="h-7 w-7" strokeWidth={2} />
        </span>
        <h1 className="font-display text-2xl text-[var(--color-forest-dark)] mt-5">
          Aggiungi
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)] max-w-xs">
          Presto da qui potrai importare uno screenshot, aggiungere un ETF,
          liquidità, un fondo pensione o inserire un dato manualmente.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
