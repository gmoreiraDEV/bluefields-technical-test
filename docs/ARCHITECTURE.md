# Architecture

## Visão Geral

Bluefields Startups é um MVP fullstack em Next.js App Router. O mesmo app entrega UI server-rendered, client components para formulários, route handlers para API, auth custom e acesso ao banco via Prisma.

## Stack

- Frontend: Next.js 16, React 19, Tailwind CSS e shadcn/radix-nova.
- Backend: Next.js route handlers em `app/api`.
- Banco: PostgreSQL via Prisma 7.
- Auth: JWT assinado com `jose`, cookie `bf_session` httpOnly.
- Deploy: Railway com Next standalone e Postgres gerenciado.

## Modelagem

- `User`: usuário interno Bluefields, com nome, e-mail único e hash de senha.
- `Startup`: startup acelerada, segmento, fase, responsável Bluefields e risco atual.
- `StartupUpdate`: update periódico com resumo semanal, bloqueios, próximos passos, risco no momento e autor.
- `RiskLevel`: enum `GREEN`, `YELLOW`, `RED`.

## Fluxo de Dados

- Páginas protegidas chamam `requireUser()` no servidor.
- APIs protegidas chamam `requireApiUser()`.
- Formulários client-side enviam JSON para route handlers.
- Route handlers validam com `zod`, gravam via Prisma e retornam JSON.
- Dashboard consulta startups e último update diretamente no servidor.
- Registro de update também atualiza o risco atual da startup.

## APIs

- `POST /api/auth/register`: cria usuário, assina sessão e seta cookie.
- `POST /api/auth/login`: valida credenciais e seta cookie.
- `POST /api/auth/logout`: limpa cookie.
- `GET /api/startups`: lista startups com último update.
- `POST /api/startups`: cria startup.
- `GET /api/startups/[id]`: retorna detalhe e histórico.
- `PATCH /api/startups/[id]`: atualiza dados básicos e risco.
- `DELETE /api/startups/[id]`: remove startup e updates.
- `POST /api/startups/[id]/updates`: cria update e sincroniza risco atual.
- `GET /api/health`: healthcheck Railway.

## Segurança

- Sessão em cookie httpOnly, `sameSite=lax` e `secure` em produção.
- Senha hasheada com `crypto.scrypt` e salt por usuário.
- JWT expira em 7 dias.
- Inputs validados com `zod`.
- Rotas protegidas retornam 401 sem sessão.
- Erros de API são mensagens controladas, sem stack trace.

## Deploy

- `next.config.ts` usa `output: "standalone"`.
- `npm run start` executa `.next/standalone/server.js`.
- `railway.json` define `npm run db:migrate` como pre-deploy.
- Railway deve receber `DATABASE_URL` do Postgres service e `SESSION_SECRET` forte.

## Trade-offs

- Sem middleware/proxy neste slice para reduzir superfície de erro no Next 16.
- Single-tenant atende o teste e evita modelagem prematura de organizações.
- Auth custom é suficiente para MVP, mas uma solução gerenciada pode ser melhor para produção maior.
