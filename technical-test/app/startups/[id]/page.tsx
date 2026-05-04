import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { DeleteStartupButton } from "@/components/delete-startup-button";
import { RiskBadge } from "@/components/risk-badge";
import { StartupForm } from "@/components/startup-form";
import { Button } from "@/components/ui/button";
import { UpdateForm } from "@/components/update-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { type RiskLevelValue } from "@/lib/validators";

export const runtime = "nodejs";

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const startup = await db.startup.findUnique({
    where: { id },
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, name: true, email: true } },
        },
      },
    },
  });

  if (!startup) {
    notFound();
  }

  const riskLevel = startup.riskLevel as RiskLevelValue;

  return (
    <main className="min-h-screen bg-slate-100">
      <AppHeader user={user} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost">
            <Link href="/dashboard">
              <ArrowLeft />
              Voltar
            </Link>
          </Button>
          <DeleteStartupButton startupId={startup.id} />
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold text-slate-950">
                  {startup.name}
                </h1>
                <RiskBadge level={riskLevel} />
              </div>
              <p className="mt-2 text-slate-600">
                {startup.segment} · {startup.stage}
              </p>
            </div>
            <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 md:min-w-80">
              <InfoLine
                icon={<UserRound className="size-4" />}
                label="Responsável"
                value={startup.bluefieldsOwner}
              />
              <InfoLine
                icon={<CalendarDays className="size-4" />}
                label="Atualizado"
                value={formatDateTime(startup.updatedAt)}
              />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">Dados básicos</p>
              <h2 className="text-xl font-semibold text-slate-950">
                Editar cadastro
              </h2>
            </div>
            <StartupForm
              startup={{
                id: startup.id,
                name: startup.name,
                segment: startup.segment,
                stage: startup.stage,
                bluefieldsOwner: startup.bluefieldsOwner,
                riskLevel,
              }}
            />
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-500">Update periódico</p>
              <h2 className="text-xl font-semibold text-slate-950">
                Registrar novo update
              </h2>
            </div>
            <UpdateForm startupId={startup.id} currentRiskLevel={riskLevel} />
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-950">
              Histórico de updates
            </h2>
            <p className="text-sm text-slate-500">
              Registro cronológico do progresso, riscos e próximos passos.
            </p>
          </div>

          {startup.updates.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {startup.updates.map((update) => (
                <article key={update.id} className="px-6 py-5">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <RiskBadge level={update.riskSnapshot as RiskLevelValue} />
                      <span className="text-sm text-slate-500">
                        {formatDateTime(update.createdAt)}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      por {update.author.name}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <TextBlock title="O que aconteceu" value={update.weeklySummary} />
                    <TextBlock
                      title="Bloqueios"
                      value={update.blockers ?? "Sem bloqueios registrados."}
                    />
                    <TextBlock title="Próximos passos" value={update.nextSteps} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="font-medium text-slate-950">Nenhum update registrado.</p>
              <p className="mt-1 text-sm text-slate-500">
                Use o formulário acima para documentar o primeiro acompanhamento.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-md bg-slate-50 p-3">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <span>
        <span className="block text-xs font-medium uppercase text-slate-400">
          {label}
        </span>
        <span className="block font-medium text-slate-800">{value}</span>
      </span>
    </div>
  );
}

function TextBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">
        {value}
      </p>
    </div>
  );
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
