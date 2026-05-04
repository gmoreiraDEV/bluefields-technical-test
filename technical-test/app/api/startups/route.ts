import { NextResponse } from "next/server";
import { jsonError, readJson, requireApiUser } from "@/lib/api";
import { db } from "@/lib/db";
import { parseRequestBody, startupCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const startups = await db.startup.findMany({
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          author: { select: { id: true, name: true, email: true } },
        },
      },
    },
    orderBy: [{ riskLevel: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ startups });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();

  if (auth.response) {
    return auth.response;
  }

  const body = await readJson(request);
  const parsed = parseRequestBody(startupCreateSchema, body);

  if (!parsed.success) {
    return jsonError(parsed.error);
  }

  const startup = await db.startup.create({
    data: parsed.data,
  });

  return NextResponse.json({ startup }, { status: 201 });
}
