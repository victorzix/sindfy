# docs/evolution — Memória local do projeto

Esta pasta é a **memória commitada** do projeto. Ao final de **cada commit** criamos um
`.txt` registrando o que foi feito e o que ficou pendente/planejado.

> A leitura desta pasta é **obrigatória** antes de iniciar qualquer trabalho (ver `CLAUDE.md`).

## Convenção de nomeação

```
NNNN-descricao-curta.txt
```

- `NNNN` — sequência com 4 dígitos (`0001`, `0002`, ...), na ordem dos commits.
- `descricao-curta` — resumo em kebab-case do que o commit entregou.

## Formato do arquivo

```
# NNNN — Título do commit
Data: AAAA-MM-DD

## Feito
- item entregue
- item entregue

## Pendente / Planejado
- o que ficou para depois
- o que já planejamos e ainda não implementamos
```
