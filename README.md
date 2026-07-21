# sandfy

Micro-SaaS para **síndicos profissionais**: triagem de chamados e acionamento de
fornecedores via WhatsApp, com painel de controle simples.

## Stack

- **Next.js** (App Router, TypeScript) — front + back
- **Tailwind v4 + shadcn/ui** — UI
- **Zustand** — estado de cliente
- **React Hook Form + Zod** — formulários e validação
- **TanStack Query** — estado de servidor
- **Drizzle ORM** — acesso a dados (provedor de banco a definir)
- Integrações: **Evolution API** (WhatsApp), **n8n**, **IA** (Gemini/OpenAI)

## Começando

```bash
npm install
cp .env.example .env   # preencha as variáveis
npm run dev
```

## Documentação

- [`CLAUDE.md`](./CLAUDE.md) — princípios, estrutura e regras de trabalho (leitura obrigatória)
- [`docs/evolution/`](./docs/evolution) — memória local do projeto (o que foi feito / pendências)
