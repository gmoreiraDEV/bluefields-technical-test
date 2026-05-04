# AI Plan

## Objetivo

Usar IA como aceleradora de desenvolvimento, mantendo decisão técnica, validação e responsabilidade humana sobre arquitetura, segurança e qualidade.

## Ferramentas

- Codex para leitura do repo, planejamento, implementação, refino e validação.
- Documentação oficial local do Next.js 16 em `node_modules/next/dist/docs`.
- Documentação oficial Railway para deploy, Postgres, pre-deploy command e healthchecks.

## Decomposição

1. Entender README raiz e transformar o problema em PRD.
2. Definir primeiro slice vertical: auth, banco, APIs e dashboard.
3. Implementar contratos compartilhados: Prisma schema, validators, auth e responses.
4. Implementar rotas protegidas e UI.
5. Preparar deploy Railway com standalone, healthcheck e migrations.
6. Documentar arquitetura, setup, revisão de qualidade e autoavaliação.

## Prompts e Abordagem

- Pedir plano antes de implementar cada slice.
- Solicitar implementação com critério de MVP, sem features fora de escopo.
- Pedir validação por comandos locais: Prisma validate/generate, lint, build e testes manuais por API.
- Usar a IA para gerar primeira versão, depois revisar tipagem, erros de build e falhas de ambiente.

## Checkpoints

- Após ler README: confirmar entregáveis e critério de avaliação.
- Após schema: rodar `npx prisma validate`.
- Após APIs: testar 401 sem sessão e fluxo autenticado.
- Após UI: rodar `npm run lint` e `npm run build`.
- Após Railway: conferir config, env vars e docs contra fonte oficial.

## Guardrails

- Não aceitar código gerado sem build/lint.
- Não expor stack trace ou segredo em respostas de API.
- Validar todo input com `zod`.
- Usar cookie httpOnly para sessão.
- Evitar integrações externas fora do MVP.
- Documentar trade-offs e pendências em vez de esconder limitações.

## Riscos

- Prisma 7 exige adapter ou accelerate URL; mitigado com `@prisma/adapter-pg` para Postgres.
- Railway em monorepo pode não detectar app; mitigado com Root Directory `/technical-test`.
- `migrate dev` local falhou com Prisma Postgres; migration SQL foi versionada e deploy usa `migrate deploy`.
- `npm audit fix --force` pode causar downgrade inseguro de dependências; manter overrides explícitos e validar `npm audit` antes do deploy.
