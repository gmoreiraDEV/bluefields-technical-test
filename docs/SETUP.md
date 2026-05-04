# Setup e Deploy

## Requisitos

- Node.js compatível com Next.js 16.
- npm.
- Postgres local, Prisma Postgres local ou Postgres Railway.

## Setup local

```bash
cd technical-test
npm install
cp .env.example .env
```

Edite `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bluefields"
SESSION_SECRET="replace-with-at-least-32-random-characters"
```

Gere client e aplique banco:

```bash
npm run db:generate
npx prisma migrate deploy
```

Se estiver usando Prisma Postgres local e `migrate deploy` não conectar, use:

```bash
npx prisma dev
npx prisma db push
```

## Rodar localmente

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Validação local

```bash
npm run lint
npm run build
npx prisma validate
npx prisma generate
```

## Deploy Railway

1. Suba o repositório para GitHub.
2. Crie um projeto Railway.
3. Adicione Database -> PostgreSQL.
4. Crie o web service a partir do GitHub repo.
5. Configure o service:
   - Root Directory: `/technical-test`
   - Config File: `/technical-test/railway.json`
6. Configure variáveis:
   - `DATABASE_URL`: reference variable do Postgres service.
   - `SESSION_SECRET`: segredo forte, não reutilizar o valor local.
7. Confirme que o pre-deploy command é `npm run db:migrate`.
8. Gere domínio público em Settings -> Networking -> Generate Domain.
9. Teste:
   - `/api/health`
   - `/register`
   - `/dashboard`

## Scripts

- `npm run dev`: servidor local.
- `npm run lint`: ESLint.
- `npm run build`: build standalone.
- `npm run start`: inicia standalone server.
- `npm run db:generate`: gera Prisma Client.
- `npm run db:migrate`: aplica migrations em produção.

## Variáveis de ambiente

- `DATABASE_URL`: string Postgres usada pelo Prisma.
- `SHADOW_DATABASE_URL`: opcional para fluxos locais de migrate dev.
- `SESSION_SECRET`: segredo para assinar JWT de sessão.

## Observações

- `.env` não deve ser commitado.
- `prisma/migrations` deve ser commitado para Railway aplicar migrations.
- O primeiro usuário pode ser criado em `/register` após deploy.
