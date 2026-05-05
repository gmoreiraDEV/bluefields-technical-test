# Bluefields Startups

MVP fullstack para a Bluefields acompanhar startups aceleradas em um único lugar, com autenticação, cadastro de startups, updates periódicos, nível de risco e dashboard consolidado.

## Stack

- Next.js 16 e React 19.
- Tailwind CSS e shadcn/radix-nova.
- Prisma 7 com PostgreSQL.
- Auth custom com JWT, `jose` e cookie `bf_session` httpOnly.
- Deploy preparado para Railway.

## Rodar Localmente

```bash
npm install
cp .env.example .env
npm run db:generate
npx prisma migrate deploy
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis

- `DATABASE_URL`: URL PostgreSQL usada pelo Prisma.
- `SHADOW_DATABASE_URL`: opcional para fluxos locais de migration.
- `SESSION_SECRET`: segredo forte para assinar as sessões.

## Scripts

- `npm run dev`: inicia o servidor local.
- `npm run lint`: executa ESLint.
- `npm run build`: gera build standalone.
- `npm run start`: inicia o servidor standalone.
- `npm run db:generate`: gera Prisma Client.
- `npm run db:migrate`: aplica migrations em produção.
- `npm run db:seed:startups`: popula o banco com startups iniciais.

## Deploy Railway

Configure o service Railway com:

- Root Directory: `/technical-test`
- Config File: `/technical-test/railway.json`
- `DATABASE_URL`: reference variable do Postgres service.
- `SESSION_SECRET`: segredo forte, diferente do valor local.

O start command do Railway força `HOSTNAME=0.0.0.0` para o Next.js standalone escutar corretamente dentro do container. O healthcheck público está em `/api/health`.

### Seed inicial via Railway CLI

O arquivo de seed está em `prisma/seeds-startups.sql`.

Para executar o seed no ambiente Railway, rode dentro do diretório `technical-test`:

```bash
railway run -- npm run db:seed:startups
```

Se quiser executar o arquivo diretamente pelo Prisma no Railway CLI:

```bash
railway run -- npx prisma db execute --schema ./prisma/schema.prisma --file ./prisma/seeds-startups.sql
```

