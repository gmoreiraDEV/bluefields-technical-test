import { Building2 } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import type { SessionUser } from "@/lib/auth";

export function AppHeader({ user }: { user: SessionUser }) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-slate-950 text-white">
            <Building2 className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-950">
              Bluefields Startups
            </span>
            <span className="block text-xs text-slate-500">
              Monitoramento de aceleradas
            </span>
          </span>
        </Link>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="text-sm text-slate-600">
            <span className="block font-medium text-slate-900">{user.name}</span>
            <span className="block text-xs">{user.email}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
