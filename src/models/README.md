# src/models

Entidades de domínio: representam o estado e as regras do negócio (Chamado, Condomínio,
Morador, Fornecedor, etc.). **Sem dependência de framework, banco ou HTTP.**

- Um arquivo por entidade, com um único objetivo de export.
- Nada de acesso a dados aqui — isso é `src/database`.
