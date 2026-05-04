# Plano para Documentação do Teste Bluefields

## Resumo

Criar o diretório raiz `/docs` como centro de documentação do teste técnico. Este arquivo registra como a documentação será produzida, em qual ordem e quais entregáveis do README serão cobertos.

O README raiz define o objetivo: transformar o problema da Bluefields em um MVP fullstack para acompanhamento de startups, com PRD, plano AI-first, arquitetura, skill de revisão, autoavaliação, código funcional, autenticação, persistência e deploy.

## Mudanças principais

- Criar `docs/DOCUMENTATION-PLAN.md` com:
  - resumo do desafio e critérios de avaliação;
  - inventário dos entregáveis exigidos;
  - ordem recomendada de criação dos documentos;
  - checklist de conclusão por documento;
  - riscos de documentação incompleta.

- Planejar estes documentos dentro de `/docs`:
  - `PRD.md`: problema, usuários, jobs to be done, escopo, fluxos e critérios de sucesso.
  - `AI-PLAN.md`: uso de Codex/IA, decomposição, checkpoints e guardrails.
  - `ARCHITECTURE.md`: stack, modelagem, APIs, autenticação, dados e deploy.
  - `QUALITY-REVIEW-SKILL.md`: checklist reutilizável de qualidade, segurança e maintainability.
  - `REVIEW.md`: autoavaliação, trade-offs, débitos e próximos passos.
  - `SETUP.md`: setup local, variáveis de ambiente, banco, lint/build e deploy.

- Registrar o estado atual como ponto de partida:
  - app em `technical-test`;
  - Next.js 16, React 19, Tailwind/shadcn e Prisma;
  - tela inicial ainda em `Hello world`;
  - Prisma configurado, mas sem modelos de domínio;
  - sem documentação técnica prévia em `/docs`.

## Ordem de documentação

1. `PRD.md`
   - Definir o problema de negócio em termos de produto.
   - Descrever usuários, jobs to be done, escopo, não escopo e fluxos principais.
   - Estabelecer critérios de sucesso e métricas simples para o MVP.

2. `AI-PLAN.md`
   - Documentar como o trabalho será quebrado para uso com IA.
   - Registrar prompts, checkpoints, validações humanas e riscos de depender de código gerado.
   - Explicitar guardrails de segurança, qualidade e revisão.

3. `ARCHITECTURE.md`
   - Descrever decisões técnicas, stack e responsabilidades de frontend/backend.
   - Definir modelagem inicial de dados para startups, updates, risco e usuários.
   - Mapear APIs, fluxo de dados, autenticação, autorização e deploy.

4. `SETUP.md`
   - Documentar instalação, variáveis de ambiente, banco local/remoto e scripts.
   - Incluir comandos para rodar, validar e preparar deploy.

5. `QUALITY-REVIEW-SKILL.md`
   - Criar uma skill/checklist reutilizável para revisão de código.
   - Cobrir qualidade, segurança, testes, maintainability e riscos comuns de código gerado por IA.

6. `REVIEW.md`
   - Registrar autoavaliação final.
   - Explicar o que ficou bom, o que ficou fora, débitos assumidos e próximos passos.

## Interfaces

Nenhuma API pública, schema ou tipo de aplicação será alterado nesta etapa. A mudança é apenas de documentação e organização do repositório.

## Plano de testes

- Conferir se `docs/DOCUMENTATION-PLAN.md` cobre todos os entregáveis do README raiz.
- Validar se cada documento planejado tem objetivo claro e critérios de conclusão.
- Verificar links e caminhos citados contra a estrutura real do repositório.
- Após a implementação futura da documentação, rodar uma revisão manual usando o próprio checklist de `QUALITY-REVIEW-SKILL.md`.

## Premissas

- `/docs` fica na raiz do repositório, não dentro de `technical-test`.
- Os entregáveis exigidos pelo README ficam em `/docs`, mesmo que o README liste nomes simples como `PRD.md`.
- A documentação começa antes da implementação completa do MVP e deve ser atualizada conforme o produto evoluir.
