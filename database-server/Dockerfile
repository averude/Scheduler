FROM postgres:12.5
MAINTAINER Andrew Kolesnyk

COPY ./sh-scripts/* /docker-entrypoint-initdb.d/
COPY ./sql-scripts/* /sql-scripts/

EXPOSE 5432
