import { NextResponse } from "next/server";
import { createSessionToken, hashPassword, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { jsonError, readJson } from "@/lib/api";
import { parseRequestBody, registerSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJson(request);
  const parsed = parseRequestBody(registerSchema, body);

  if (!parsed.success) {
    return jsonError(parsed.error);
  }

  const existingUser = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return jsonError("Já existe uma conta com este e-mail.", 409);
  }

  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    },
    select: { id: true, email: true, name: true },
  });

  const token = await createSessionToken(user);
  const response = NextResponse.json({ user }, { status: 201 });
  setSessionCookie(response, token);

  return response;
}
