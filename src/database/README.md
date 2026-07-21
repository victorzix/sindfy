# src/database

Camada de acesso a dados: client de conexão + repositórios que leem/gravam entidades.
ORM: **Drizzle** (provedor de banco a confirmar).

- Repositórios expõem interfaces; `src/core` depende da interface, não da implementação.
- Um repositório por arquivo, um único objetivo de export.
