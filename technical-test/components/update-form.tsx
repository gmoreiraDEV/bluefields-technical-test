"use client";

import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  riskDescriptions,
  riskLabels,
  riskLevels,
  type RiskLevelValue,
} from "@/lib/validators";

export function UpdateForm({
  startupId,
  currentRiskLevel,
}: {
  startupId: string;
  currentRiskLevel: RiskLevelValue;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(`/api/startups/${startupId}/updates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok) {
      setError(body?.error ?? "Não foi possível registrar o update.");
      return;
    }

    formRef.current?.reset();
    router.refresh();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700">O que aconteceu</span>
        <textarea
          name="weeklySummary"
          required
          minLength={10}
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          placeholder="Resumo objetivo da semana, aprendizados e progresso."
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700">Bloqueios</span>
        <textarea
          name="blockers"
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          placeholder="Bloqueios, riscos ou dependências. Deixe vazio se não houver."
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700">Próximos passos</span>
        <textarea
          name="nextSteps"
          required
          minLength={5}
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          placeholder="Ações combinadas para o próximo ciclo."
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700">Risco neste update</span>
        <select
          name="riskSnapshot"
          required
          defaultValue={currentRiskLevel}
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
        >
          {riskLevels.map((riskLevel) => (
            <option key={riskLevel} value={riskLevel}>
              {riskLabels[riskLevel]} - {riskDescriptions[riskLevel]}
            </option>
          ))}
        </select>
      </label>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : <Plus />}
        Registrar update
      </Button>
    </form>
  );
}
