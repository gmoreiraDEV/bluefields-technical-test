"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeleteStartupButton({ startupId }: { startupId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Excluir esta startup e todo o histórico de updates?",
    );

    if (!confirmed) {
      return;
    }

    setPending(true);
    const response = await fetch(`/api/startups/${startupId}`, {
      method: "DELETE",
    });

    setPending(false);

    if (response.ok) {
      router.replace("/dashboard");
      router.refresh();
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDelete}
      disabled={pending}
    >
      <Trash2 />
      {pending ? "Excluindo" : "Excluir"}
    </Button>
  );
}
