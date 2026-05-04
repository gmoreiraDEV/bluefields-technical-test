import { NextResponse } from "next/server";
import { jsonError, readJson, requireApiUser } from "@/lib/api";
import { db } from "@/lib/db";
import { parseRequestBody, startupPatchSchema } from "@/lib/validators";

export const runtime = "nodejs";

type StartupRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: StartupRouteContext) {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const { id } = await context.params;
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
    return jsonError("Startup não encontrada.", 404);
  }

  return NextResponse.json({ startup });
}

export async function PATCH(request: Request, context: StartupRouteContext) {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const { id } = await context.params;
  const body = await readJson(request);
  const parsed = parseRequestBody(startupPatchSchema, body);

  if (!parsed.success) {
    return jsonError(parsed.error);
  }

  const existingStartup = await db.startup.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingStartup) {
    return jsonError("Startup não encontrada.", 404);
  }

  const startup = await db.startup.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ startup });
}

export async function DELETE(_request: Request, context: StartupRouteContext) {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const { id } = await context.params;
  const existingStartup = await db.startup.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingStartup) {
    return jsonError("Startup não encontrada.", 404);
  }

  await db.startup.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
