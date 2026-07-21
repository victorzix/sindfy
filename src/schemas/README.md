# src/schemas

Contratos e validação de dados: DTOs de entrada e saída (payloads de API, webhooks do n8n /
Evolution API, formulários). Fronteira que valida o que entra e o que sai.

- Padrão: **Zod** (mesma validação usada com React Hook Form).
- Um schema por arquivo, um único objetivo de export.
- Não conter regra de negócio — isso é `src/core`.
