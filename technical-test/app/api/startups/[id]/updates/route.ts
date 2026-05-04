import { NextResponse } from "next/server";
import { jsonError, readJson, requireApiUser } from "@/lib/api";
import { db } from "@/lib/db";
import { parseRequestBody, startupUpdateSchema } from "@/lib/validators";

export const runtime = "nodejs";

type StartupUpdatesRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: StartupUpdatesRouteContext) {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const { id } = await context.params;
  const body = await readJson(request);
  const parsed = parseRequestBody(startupUpdateSchema, body);

  if (!parsed.success) {
    return jsonError(parsed.error);
  }

  const startup = await db.startup.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!startup) {
    return jsonError("Startup não encontrada.", 404);
  }

  const update = await db.startupUpdate.create({
    data: {
      startupId: id,
      authorId: auth.user.id,
      weeklySummary: parsed.data.weeklySummary,
      blockers: parsed.data.blockers,
      nextSteps: parsed.data.nextSteps,
      riskSnapshot: parsed.data.riskSnapshot,
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  });

  await db.startup.update({
    where: { id },
    data: { riskLevel: parsed.data.riskSnapshot },
  });

  return NextResponse.json({ update }, { status: 201 });
}
