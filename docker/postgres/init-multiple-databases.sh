#!/bin/bash
# Cria múltiplos bancos no primeiro boot do Postgres.
# Lê POSTGRES_MULTIPLE_DATABASES (lista separada por vírgula) do ambiente.
set -euo pipefail

create_database() {
	local database="$1"
	echo "  Criando banco '$database' (se não existir)"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
		SELECT 'CREATE DATABASE "$database"'
		WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$database')\gexec
	EOSQL
}

if [ -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
	echo "Bancos solicitados: $POSTGRES_MULTIPLE_DATABASES"
	for db in $(echo "$POSTGRES_MULTIPLE_DATABASES" | tr ',' ' '); do
		create_database "$db"
	done
	echo "Bancos criados."
fi
