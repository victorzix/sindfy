# CLAUDE.md — Guia do Projeto (Painel do Síndico)

> Leitura obrigatória antes de qualquer trabalho. Contém as regras de código e de
> fluxo que valem para **todo** o projeto.

---

## 1. Visão

Micro-SaaS para **síndicos profissionais**: um assistente via WhatsApp + um painel simples que
organiza a comunicação do condomínio. Duas funcionalidades no MVP:

- **A — Gestão de Chamados (Triagem):** morador manda texto/áudio no WhatsApp → IA extrai
  bloco, apto, problema e urgência → protocolo automático → card em painel visual (Kanban).
- **B — Acionamento de Fornecedores:** banco simples de prestadores por condomínio → botão
  "Acionar Fornecedor" no card → mensagem automática via WhatsApp para o prestador.

> Blueprint completo: [`gemini-code-1784643469928.md`](./gemini-code-1784643469928.md).
> **Não adicionar funcionalidades fora do MVP.**

---

## 2. Stack

- **Framework:** Next.js full-stack (back + front) — simples e barato de fazer deploy.
- **Banco de dados / ORM:** Drizzle ORM (provedor de banco a confirmar).
- **Integrações:** Evolution API (WhatsApp), n8n (orquestração/webhooks), IA (Gemini/OpenAI).
- **Configuração:** toda leitura de ambiente passa por `src/settings` (config tipada e
  validada). **Nunca** ler `process.env` espalhado pelo código.

### Bibliotecas de uso obrigatório

Padrão do projeto — **usar sempre** estas ferramentas para o seu propósito (não introduzir
alternativas sem combinar antes):

- **shadcn/ui** — componentes de UI (base de todo componente visual).
- **Zustand** — estado global de cliente.
- **React Hook Form + Zod** — formulários e validação (Zod é também o padrão dos `schemas`).
- **TanStack Query (React Query)** — estado de servidor: data fetching, cache e sincronização.

---

## 3. Princípios de código (inegociáveis)

- **SOLID** e **Clean Code** sempre, em tudo.
- **Segregação máxima:** um arquivo = **um objetivo de export**. Sem arquivos grandes ou com
  múltiplas responsabilidades. Se um arquivo cresce ou acumula propósitos, quebrar.
- **DRY:** zero repetição. Extrair para `src/utils` e reutilizar amplamente.
- **Nomes claros**, funções pequenas, dependências explícitas.
- Código novo deve **ler como o código ao redor** (mesmo estilo, idioma e convenções).

---

## 4. Estrutura de pastas

Cada pasta tem **responsabilidade única** (ver README dentro de cada uma):

```
src/
  models/       Entidades de domínio (estado/regras do negócio), sem framework.
  schemas/      Contratos/validação (DTOs de entrada e saída).
  core/         Casos de uso / regras de negócio que orquestram os models.
  settings/     Leitura e validação tipada de env / config da app.
  database/     Acesso a dados (client + repositórios). Tecnologia a definir.
  services/     Integrações externas: Evolution API, n8n, IA.
  utils/        Funções utilitárias puras e reutilizáveis.
  components/   Componentes de UI reutilizáveis (frontend).
  pages/        Páginas/rotas do painel (com Next App Router migra para app/).
docs/
  evolution/    Memória local do projeto (ver seção 6).
```

---

## 5. Fluxo de trabalho (regras obrigatórias)

- **Sem SDD e sem TDD.** Foco em código limpo e bem segregado.
- **Perguntar antes de implementar funcionalidades.** Sempre esclarecer dúvidas para máxima
  assertividade antes de codar algo novo.
- **Playwright obrigatório ao final** de toda entrega que envolva frontend — validar o
  comportamento real na tela antes de considerar concluído.
- **Commits por etapas.** Recomendar os commits divididos por etapa e **commitar somente
  após aprovação do usuário**. Nunca commitar sem "ok".
- **Usar agentes** (podem ser Sonnet) sempre que acelerar ou qualificar a entrega.
- Ambiente via `.env` (não versionado). O clone do **`evolution-api/` não é commitado** —
  em algumas máquinas roda local, em outras só conectamos via env.

---

## 6. Memória local — `docs/evolution/`

- Ao final de **cada commit**, gerar um `.txt` em `docs/evolution/` registrando:
  - **Feito:** o que foi entregue naquele commit.
  - **Pendente/Planejado:** o que ficou para depois e o que já planejamos.
- Objetivo: memória local **e commitada** do que fizemos e do que ficou faltando.
- **Leitura obrigatória de `docs/evolution/` antes de iniciar qualquer trabalho** —
  é o histórico de decisões e pendências do projeto.
