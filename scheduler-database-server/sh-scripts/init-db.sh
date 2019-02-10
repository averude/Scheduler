#!/bin/bash

echo "---CREATING DATABASE AND USER---"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -f /sql-scripts/1-init-db.sql
echo "---CREATING TABLES---"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "schedulerdb" -f /sql-scripts/2-database-create-tables.sql
echo "---INSERTING TEST DATA---"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "schedulerdb" -f /sql-scripts/3-database-insert-test-data.sql
echo "---SCRIPT IS DONE---"