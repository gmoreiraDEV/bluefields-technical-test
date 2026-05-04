import { NextResponse } from "next/server";
import { createSessionToken, setSessionCookie, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { jsonError, readJson } from "@/lib/api";
import { loginSchema, parseRequestBody } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJson(request);
  const parsed = parseRequestBody(loginSchema, body);

  if (!parsed.success) {
    return jsonError(parsed.error);
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return jsonError("E-mail ou senha inválidos.", 401);
  }

  const sessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  const token = await createSessionToken(sessionUser);
  const response = NextResponse.json({ user: sessionUser });
  setSessionCookie(response, token);

  return response;
}
