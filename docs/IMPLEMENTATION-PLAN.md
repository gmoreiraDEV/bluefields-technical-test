# Slice 2: Plano de Implementação do MVP Bluefields

## Resumo

Implementar o primeiro slice vertical do app em `technical-test`: autenticação funcional, persistência com Prisma Postgres, cadastro/listagem de startups, registro de updates periódicos, nível de risco e dashboard consolidado. A UI será objetiva, em português, usando Next.js App Router, Tailwind/shadcn e lucide.

## Mudanças principais

- Stack e setup:
  - Manter Next.js 16, React 19, Tailwind/shadcn e Prisma.
  - Adicionar dependências diretas: `prisma`, `@prisma/client`, `zod`, `jose`, `@prisma/adapter-pg` e `pg`.
  - Configurar `SESSION_SECRET` e manter `DATABASE_URL`.
  - Criar Prisma client singleton em `lib/db.ts` e helpers de auth em `lib/auth.ts`.

- Dados:
  - Criar modelos Prisma `User`, `Startup` e `StartupUpdate`.
  - `Startup` terá nome, segmento, fase, responsável Bluefields, risco `GREEN/YELLOW/RED` e relação com updates.
  - `StartupUpdate` terá resumo da semana, bloqueios, próximos passos, snapshot de risco e autor.
  - Gerar migration inicial e seed opcional de um usuário demo se necessário para testes locais.

- Auth e API:
  - Implementar auth custom com senha hasheada via `crypto.scrypt`, JWT assinado com `jose` e cookie `bf_session` httpOnly.
  - Rotas: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`.
  - Rotas protegidas: `GET/POST /api/startups`, `GET/PATCH/DELETE /api/startups/[id]`, `POST /api/startups/[id]/updates`.
  - Validar inputs com `zod`, retornar erros 400/401/404 sem expor stack trace.

- Produto/UI:
  - Trocar `Hello world` por fluxo real: `/login`, `/register`, `/dashboard`, `/startups/new`, `/startups/[id]`.
  - Dashboard com contadores por risco, total de startups, lista ordenada por risco e atualização mais recente.
  - Detalhe da startup com informações básicas, histórico de updates e formulário para novo update.
  - Proteger páginas via helper server-side `requireUser`; sem middleware/proxy neste slice.

## Plano de testes

- Rodar `npm run lint` e `npm run build` em `technical-test`.
- Rodar Prisma validate/generate/migrate depois do schema.
- Testar manualmente: registrar, logar, deslogar, bloquear acesso sem sessão, criar startup, editar risco, criar update e ver dashboard atualizado.
- Conferir responsividade básica em desktop e mobile via navegador local.

## Premissas

- Banco/auth serão Prisma Postgres + auth custom, não Supabase.
- O app é single-tenant para o time Bluefields neste MVP.
- Não haverá IA dentro do produto, integrações externas, notificações ou UI altamente polida neste slice.
- Deploy público fica para slice posterior, usando Vercel e um Postgres hospedado compatível com Prisma.
