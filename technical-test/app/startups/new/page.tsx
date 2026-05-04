import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { StartupForm } from "@/components/startup-form";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

export default async function NewStartupPage() {
  const user = await requireUser();

  return (
    <main className="min-h-screen bg-slate-100">
      <AppHeader user={user} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">Nova startup</p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Cadastrar startup acelerada
            </h1>
          </div>
          <StartupForm />
        </section>
      </div>
    </main>
  );
}
