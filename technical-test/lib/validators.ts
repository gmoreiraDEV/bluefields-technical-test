import { z } from "zod";

export const riskLevels = ["GREEN", "YELLOW", "RED"] as const;

export type RiskLevelValue = (typeof riskLevels)[number];

export const riskLabels: Record<RiskLevelValue, string> = {
  GREEN: "Verde",
  YELLOW: "Amarelo",
  RED: "Vermelho",
};

export const riskDescriptions: Record<RiskLevelValue, string> = {
  GREEN: "Dentro do esperado",
  YELLOW: "Precisa de acompanhamento",
  RED: "Risco alto ou bloqueio crítico",
};

export const riskOrder: Record<RiskLevelValue, number> = {
  RED: 0,
  YELLOW: 1,
  GREEN: 2,
};

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("Informe um e-mail válido.").toLowerCase(),
  password: z.string().min(8, "Use pelo menos 8 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido.").toLowerCase(),
  password: z.string().min(1, "Informe a senha."),
});

export const startupCreateSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome da startup."),
  segment: z.string().trim().min(2, "Informe o segmento."),
  stage: z.string().trim().min(2, "Informe a fase."),
  bluefieldsOwner: z.string().trim().min(2, "Informe o responsável Bluefields."),
  riskLevel: z.enum(riskLevels),
});

export const startupPatchSchema = startupCreateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Informe ao menos um campo para atualizar.",
);

export const startupUpdateSchema = z.object({
  weeklySummary: z.string().trim().min(10, "Descreva o que aconteceu na semana."),
  blockers: z.string().trim().optional().transform((value) => value || null),
  nextSteps: z.string().trim().min(5, "Informe os próximos passos."),
  riskSnapshot: z.enum(riskLevels),
});

export function parseRequestBody<T>(
  schema: z.ZodType<T>,
  body: unknown,
): { success: true; data: T } | { success: false; error: string } {
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return { success: false, error: firstError };
  }

  return { success: true, data: parsed.data };
}
