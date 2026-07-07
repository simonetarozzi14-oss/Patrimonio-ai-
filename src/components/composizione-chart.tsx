"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { composizionePatrimonio } from "@/lib/mock-data";

export function ComposizioneChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Composizione del patrimonio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-4">
        <div className="h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={composizionePatrimonio}
                dataKey="percentuale"
                nameKey="categoria"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
              >
                {composizionePatrimonio.map((voce) => (
                  <Cell key={voce.categoria} fill={voce.colore} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col gap-2 w-full">
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
              <span className="text-[var(--color-muted)] font-medium">
                {voce.percentuale}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
