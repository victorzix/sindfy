# src/core

Casos de uso / regras de negócio: orquestram `models`, `database` e `services` para executar
uma ação do domínio (ex.: registrar chamado, acionar fornecedor).

- Um caso de uso por arquivo, um único objetivo de export.
- Depende de abstrações, não de detalhes (SOLID). Sem HTTP/UI aqui.
