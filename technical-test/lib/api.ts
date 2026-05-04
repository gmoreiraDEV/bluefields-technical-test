import { NextResponse } from "next/server";
import { getCurrentUser, type SessionUser } from "@/lib/auth";

type ApiAuthResult =
  | { user: SessionUser; response: null }
  | { user: null; response: NextResponse };

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function requireApiUser(): Promise<ApiAuthResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: jsonError("Não autenticado.", 401),
    };
  }

  return { user, response: null };
}
