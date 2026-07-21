# src/settings

Leitura e validação **tipada** das variáveis de ambiente e configuração da app. Ponto único
de acesso ao ambiente.

- **Nunca** ler `process.env` fora daqui.
- Falhar cedo se uma variável obrigatória estiver ausente/ inválida.
