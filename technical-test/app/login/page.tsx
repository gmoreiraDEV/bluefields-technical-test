import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium text-slate-500">Bluefields Startups</p>
          <h1 className="text-2xl font-semibold text-slate-950">Entrar</h1>
          <p className="text-sm text-slate-600">
            Acesse a visão consolidada das startups aceleradas.
          </p>
        </div>
        <AuthForm mode="login" />
      </section>
    </main>
  );
}
