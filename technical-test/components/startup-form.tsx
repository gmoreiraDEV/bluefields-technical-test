"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  riskDescriptions,
  riskLabels,
  riskLevels,
  type RiskLevelValue,
} from "@/lib/validators";

type StartupFormValue = {
  id: string;
  name: string;
  segment: string;
  stage: string;
  bluefieldsOwner: string;
  riskLevel: RiskLevelValue;
};

type StartupFormProps = {
  startup?: StartupFormValue;
};

export function StartupForm({ startup }: StartupFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isEditing = Boolean(startup);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(
      isEditing ? `/api/startups/${startup?.id}` : "/api/startups",
      {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const body = await response.json().catch(() => null);

    setPending(false);

    if (!response.ok) {
      setError(body?.error ?? "Não foi possível salvar a startup.");
      return;
    }

    router.push(`/startups/${body.startup.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Nome da startup</span>
          <input
            name="name"
            required
            minLength={2}
            defaultValue={startup?.name}
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            placeholder="Ex.: FinPay"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Segmento</span>
          <input
            name="segment"
            required
            minLength={2}
            defaultValue={startup?.segment}
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            placeholder="Ex.: Fintech B2B"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Fase</span>
          <input
            name="stage"
            required
            minLength={2}
            defaultValue={startup?.stage}
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            placeholder="Ex.: MVP, Seed, Growth"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700">
            Responsável Bluefields
          </span>
          <input
            name="bluefieldsOwner"
            required
            minLength={2}
            defaultValue={startup?.bluefieldsOwner}
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            placeholder="Nome do responsável"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700">Nível de atenção</span>
        <select
          name="riskLevel"
          required
          defaultValue={startup?.riskLevel ?? "GREEN"}
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
        {pending ? <Loader2 className="animate-spin" /> : <Save />}
        {isEditing ? "Salvar alterações" : "Cadastrar startup"}
      </Button>
    </form>
  );
}
