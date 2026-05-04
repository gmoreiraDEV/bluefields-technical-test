# Review do MVP

## O que ficou Bom

- O MVP cobre o núcleo pedido: auth, persistência, cadastro de startups, updates, risco e dashboard.
- A modelagem é simples e alinhada ao domínio Bluefields.
- O dashboard prioriza leitura rápida por risco.
- A arquitetura usa poucas camadas e mantém validação compartilhada.
- O deploy Railway foi preparado com standalone, pre-deploy migrations e healthcheck.

## Decisões tomadas

- Usar Prisma Postgres em vez de Supabase para aproveitar o scaffold existente.
- Implementar auth custom com cookie httpOnly para reduzir dependências e manter controle.
- Manter single-tenant para evitar permissões prematuras.
- Não incluir IA dentro do app, porque o requisito pede IA no processo de desenvolvimento.
- Usar Railway para deploy público com Postgres gerenciado.

## Débitos assumidos

- Sem testes automatizados end-to-end.
- Sem seed oficial de usuário demo para produção.
- Sem rate limit em login/register.
- Sem reset de senha.
- Sem roles ou permissões por responsável.
- `npm audit fix --force` causou downgrade de `next` e `prisma`; o projeto foi ajustado com versões fixas e overrides transitivos para manter `npm audit` limpo.

## O que faria Depois

- Adicionar testes com Playwright para login, CRUD e update.
- Adicionar filtros por risco, responsável e startups sem update recente.
- Criar alerta visual para startups sem update há mais de 7 dias.
- Adicionar roles simples: admin e membro.
- Avaliar auth gerenciada para produção maior.
- Criar endpoint de exportação CSV para reuniões semanais.

## Estado final do slice

- Código local validado com lint e build.
- Prisma schema validado e client gerado.
- `npm audit --audit-level=moderate` validado com 0 vulnerabilidades.
- Migration SQL inicial versionada.
- App preparado para Railway, faltando apenas configurar projeto, variáveis e domínio na conta do usuário.
