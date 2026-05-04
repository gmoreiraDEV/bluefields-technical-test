# PRD: Bluefields Startups

## Contexto

A Bluefields acompanha dezenas de startups aceleradas em paralelo. Hoje, informações importantes ficam espalhadas entre WhatsApp, e-mail, reuniões, Notion, Drive e memória das pessoas. Isso dificulta saber rapidamente quais startups estão bem, quais estão travadas e quais precisam de atenção imediata.

## Problema

O time Bluefields precisa de uma visão única, atualizada e acionável do progresso, riscos e próximos passos de cada startup acelerada, sem depender de mensagens dispersas ou reuniões não documentadas.

## Usuários

- Gestor Bluefields: quer priorizar suporte e identificar startups em risco.
- Responsável Bluefields: quer registrar updates e acompanhar sua carteira.
- Time de apoio: quer entender contexto recente antes de atuar.

## Jobs To Be Done

- Quando uma startup envia progresso semanal, quero registrar o que aconteceu, bloqueios e próximos passos para manter histórico confiável.
- Quando abro o dashboard, quero ver rapidamente quantas startups estão em verde, amarelo e vermelho para priorizar atenção.
- Quando uma startup parece em risco, quero abrir seu detalhe e entender o histórico recente antes de decidir a próxima ação.

## Escopo MVP

- Autenticação funcional.
- Cadastro e edição de startups com nome, segmento, fase, responsável Bluefields e nível de risco.
- Registro de updates periódicos com resumo, bloqueios, próximos passos e snapshot de risco.
- Dashboard consolidado com contadores por risco e lista de startups.
- Persistência real em Postgres via Prisma.
- Deploy público no Railway.

## Não Escopo

- Integrações com WhatsApp, Slack, e-mail, Notion ou Drive.
- Análise automática por IA dentro do produto.
- Notificações, lembretes ou e-mails.
- Multi-tenancy, permissões granulares ou times externos.
- UI altamente polida.

## Fluxos principais

- Criar conta ou login.
- Ver dashboard consolidado.
- Cadastrar startup.
- Editar dados e risco de startup.
- Registrar update periódico.
- Consultar histórico de updates.
- Encerrar sessão.

## Critérios de Sucesso

- Um usuário autenticado consegue criar uma startup em menos de 1 minuto.
- O dashboard mostra total e distribuição por risco.
- Um update altera o risco atual da startup e aparece no histórico.
- Usuário sem sessão não acessa APIs protegidas.
- App publicado abre via URL pública e persiste dados entre sessões.

## Métricas

- Número de startups cadastradas.
- Percentual por risco verde/amarelo/vermelho.
- Tempo desde o último update por startup.
- Quantidade de startups sem update.

## Trade-offs

- Auth custom por cookie httpOnly foi escolhida para velocidade e controle no MVP.
- Single-tenant reduz complexidade de permissões.
- Prisma Postgres substitui Supabase para aproveitar o scaffold existente.
- Sem IA embarcada porque o README pede IA no processo de desenvolvimento, não no produto.
