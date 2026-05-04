import { AlertTriangle, CheckCircle2, Clock3, Plus, Siren } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { RiskBadge } from "@/components/risk-badge";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { riskOrder, type RiskLevelValue } from "@/lib/validators";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await requireUser();
  const startups = await db.startup.findMany({
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  const sortedStartups = [...startups].sort((left, right) => {
    const riskDelta =
      riskOrder[left.riskLevel as RiskLevelValue] -
      riskOrder[right.riskLevel as RiskLevelValue];

    if (riskDelta !== 0) {
      return riskDelta;
    }

    return right.updatedAt.getTime() - left.updatedAt.getTime();
  });
  const counts = {
    GREEN: 0,
    YELLOW: 0,
    RED: 0,
  };

  for (const startup of startups) {
    counts[startup.riskLevel as RiskLevelValue] += 1;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <AppHeader user={user} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-950">
              Estado geral das startups
            </h1>
          </div>
          <Button asChild>
            <Link href="/startups/new">
              <Plus />
              Nova startup
            </Link>
          </Button>
        </div>

        <section className="grid gap-3 md:grid-cols-4">
          <MetricCard
            label="Total"
            value={startups.length}
            icon={<Clock3 className="size-5 text-slate-600" />}
          />
          <MetricCard
            label="Verde"
            value={counts.GREEN}
            icon={<CheckCircle2 className="size-5 text-emerald-600" />}
          />
          <MetricCard
            label="Amarelo"
            value={counts.YELLOW}
            icon={<AlertTriangle className="size-5 text-amber-600" />}
          />
          <MetricCard
            label="Vermelho"
            value={counts.RED}
            icon={<Siren className="size-5 text-red-600" />}
          />
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-slate-950">
              Startups acompanhadas
            </h2>
            <p className="text-sm text-slate-500">
              Ordenadas por nível de atenção e atividade recente.
            </p>
          </div>

          {sortedStartups.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {sortedStartups.map((startup) => {
                const latestUpdate = startup.updates[0];

                return (
                  <Link
                    key={startup.id}
                    href={`/startups/${startup.id}`}
                    className="block px-4 py-4 transition hover:bg-slate-50"
                  >
                    <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-950">
                            {startup.name}
                          </h3>
                          <RiskBadge level={startup.riskLevel as RiskLevelValue} />
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                          {startup.segment} · {startup.stage}
                        </p>
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="block text-xs font-medium uppercase text-slate-400">
                          Responsável
                        </span>
                        {startup.bluefieldsOwner}
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="block text-xs font-medium uppercase text-slate-400">
                          Último update
                        </span>
                        {latestUpdate ? formatDate(latestUpdate.createdAt) : "Sem updates"}
                      </div>
                      <span className="text-sm font-medium text-slate-950">
                        Ver detalhes
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <p className="text-base font-medium text-slate-950">
                Nenhuma startup cadastrada.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Cadastre a primeira startup para iniciar o acompanhamento.
              </p>
              <Button asChild className="mt-4">
                <Link href="/startups/new">
                  <Plus />
                  Nova startup
                </Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
