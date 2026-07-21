# src/services

Integrações com sistemas externos, isoladas atrás de suas próprias interfaces:

- **Evolution API** — envio/recebimento de mensagens WhatsApp.
- **n8n** — webhooks e orquestração de fluxos.
- **IA** — extração de dados do chamado (Gemini/OpenAI).

Regras: um serviço por integração, um objetivo de export por arquivo. Detalhes de transporte
(HTTP, chaves) ficam aqui; regra de negócio fica em `src/core`.
