import { BottomNav } from "@/components/bottom-nav";
import { ComposizioneChart } from "@/components/composizione-chart";
import { GoalCard } from "@/components/goal-card";
import { Header } from "@/components/header";
import { PatrimonioChart } from "@/components/patrimonio-chart";
import { PatrimonioScoreCard } from "@/components/patrimonio-score-card";
import { PatrimonioTotaleCard } from "@/components/patrimonio-totale-card";
import { TreeHero } from "@/components/tree-hero";
import { WorldMapCard } from "@/components/world-map-card";
import { obiettivi } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-32">
        <div className="flex flex-col gap-6">
          <Header />

          <TreeHero />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <PatrimonioTotaleCard />
            </div>
            <div className="md:col-span-8">
              <PatrimonioChart />
            </div>

            <div className="md:col-span-4">
              <PatrimonioScoreCard />
            </div>
            <div className="md:col-span-4">
              <ComposizioneChart />
            </div>
            <div className="md:col-span-4">
              <WorldMapCard />
            </div>

            {obiettivi.map((obiettivo) => (
              <div key={obiettivo.id} className="md:col-span-6">
                <GoalCard obiettivo={obiettivo} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
