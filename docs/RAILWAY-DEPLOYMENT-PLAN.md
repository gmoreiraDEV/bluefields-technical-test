# Plano de Deploy Railway

## Objetivo

Preparar o MVP Bluefields Startups para deploy público no Railway com Next.js standalone, Postgres gerenciado, migrations Prisma em pre-deploy e healthcheck.

## Base consultada

- [Railway Next.js guide](https://docs.railway.com/guides/nextjs): recomenda `output: "standalone"`, start via standalone server e deploy com Postgres.
- [Railway Build Configuration](https://docs.railway.com/reference/build-configuration): como o app está em subdiretório, usar Root Directory `/technical-test`; se usar config file, informar caminho absoluto `/technical-test/railway.json`.
- [Railway Config as Code](https://docs.railway.com/reference/config-as-code): define `railway.json`, build/deploy config, pre-deploy command, start command e healthcheck.
- [Railway Healthchecks](https://docs.railway.com/reference/healthchecks): healthcheck deve retornar HTTP 200 e Railway injeta `PORT` para o processo web.

## Mudanças do slice

- `technical-test/next.config.ts`: habilitar `output: "standalone"`.
- `technical-test/package.json`: usar `node .next/standalone/server.js` no script `start`.
- `technical-test/railway.json`: definir Railpack, `npm run db:migrate` como pre-deploy, `HOSTNAME=0.0.0.0 npm run start`, healthcheck em `/api/health` e restart on failure.
- `technical-test/app/api/health/route.ts`: endpoint público leve para validar que o server subiu.
- `technical-test/.env.example`: documentar `DATABASE_URL`, `SHADOW_DATABASE_URL` e `SESSION_SECRET`.

## Configuração no Railway

1. Criar um projeto Railway.
2. Adicionar um service PostgreSQL.
3. Criar o web service a partir do repositório GitHub.
4. No web service, configurar:
   - Root Directory: `/technical-test`
   - Config File: `/technical-test/railway.json`
   - Variables:
     - `DATABASE_URL`: reference variable do Postgres service.
     - `SESSION_SECRET`: valor forte com pelo menos 32 caracteres aleatórios.
   - `HOSTNAME`: não precisa ser variável separada; o start command já força `0.0.0.0` para o healthcheck alcançar o Next.js standalone dentro do container.
5. Confirmar que o pre-deploy command lido do config é `npm run db:migrate`.
6. Gerar domínio público em Settings -> Networking -> Generate Domain.
7. Abrir `/api/health`, `/register` e criar a primeira conta.

## Aceite

- Build no Railway conclui sem erro.
- Pre-deploy aplica migrations com `prisma migrate deploy`.
- Healthcheck `/api/health` retorna HTTP 200.
- Domínio público abre `/login`.
- Usuário consegue registrar, criar startup, registrar update e ver dashboard atualizado.

## Riscos e Mitigações

- Se Railway não encontrar o projeto Node, conferir se Root Directory está como `/technical-test`.
- Se `railway.json` não for aplicado, configurar Config File como `/technical-test/railway.json`.
- Se migration falhar, validar se `DATABASE_URL` referencia o Postgres service e se `prisma/migrations` foi commitado.
- Se healthcheck retornar `service unavailable`, conferir se o start command mantém `HOSTNAME=0.0.0.0 npm run start`.
- Se sessão não persistir, conferir `SESSION_SECRET` e HTTPS no domínio público.
