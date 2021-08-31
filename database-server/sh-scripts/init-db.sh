#!/bin/bash

echo "---CREATING DATABASE AND USER---"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --set=DB_NAME=$DB_NAME --set=DB_USERNAME=$DB_USERNAME --set=DB_PASS=$DB_PASSWD -f /sql-scripts/1-init-db.sql
echo "---CREATING EXTENSIONS IN DATABASE---"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname $DB_NAME -c "CREATE EXTENSION btree_gist"
echo "---CREATING TABLES---"
psql -v ON_ERROR_STOP=1 --username $DB_USERNAME --dbname $DB_NAME -f /sql-scripts/2-database-create-tables.sql
echo "---INSERTING TEST DATA---"
psql -v ON_ERROR_STOP=1 --username $DB_USERNAME --dbname $DB_NAME --set=GLOBAL_ADMIN_PASS_HASH=$GLOBAL_ADMIN_PASS_HASH -f /sql-scripts/3-database-insert-initial-data.sql
echo "---SCRIPT IS DONE---"
