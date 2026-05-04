# Skill: Revisão de Qualidade e Segurança

## Objetivo

Revisar código gerado com apoio de IA antes de aceitar o slice. A skill prioriza bugs, segurança, validação, dados, testes e maintainability.

## Entrada

- Objetivo do slice.
- Diff ou lista de arquivos alterados.
- Comandos de validação disponíveis.
- Riscos conhecidos ou decisões pendentes.

## Checklist

### Produto

- O fluxo implementado resolve o job principal do usuário?
- O comportamento bate com o PRD e não adiciona escopo desnecessário?
- Estados vazios, erro e sucesso são compreensíveis?

### Segurança

- Toda rota sensível verifica autenticação no servidor?
- Inputs são validados com schema antes de gravar?
- Senhas nunca são retornadas por API?
- Cookies de sessão são httpOnly e `secure` em produção?
- Erros não vazam stack trace, SQL ou secrets?
- Variáveis sensíveis estão fora do git?

### Dados

- Migrations estão versionadas?
- Relações têm comportamento explícito de delete?
- Índices cobrem consultas mais importantes?
- Updates históricos preservam snapshot de risco?

### Código

- Nomes refletem domínio de produto.
- Duplicação existe apenas onde simplifica o MVP.
- Componentes client-side são usados somente onde há interação.
- Helpers compartilhados não escondem regras críticas.
- Tipos não usam `any` sem justificativa.

### Testes e Validação

- `npm run lint` passa.
- `npm run build` passa.
- `npx prisma validate` passa.
- Fluxo manual cobre auth, CRUD, update e dashboard.
- Acesso sem sessão retorna 401 ou redirect.

### Deploy

- Start command funciona com `PORT`.
- Healthcheck retorna HTTP 200.
- Pre-deploy aplica migrations.
- `DATABASE_URL` e `SESSION_SECRET` estão documentados.

## Saída esperada

- Lista de achados por severidade.
- Decisão: aprovado, aprovado com ressalvas ou bloqueado.
- Comandos executados e resultado.
- Riscos residuais assumidos conscientemente.

## Aplicação neste MVP

- Aprovado para MVP local após lint/build e testes manuais por API.
- Ressalvas: confirmar `migrate deploy` em Railway e substituir segredo local em produção.
