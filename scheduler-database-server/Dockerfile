FROM postgres:11.1
MAINTAINER Andrew Kolesnyk

COPY ./sh-scripts/* /docker-entrypoint-init.d/
COPY ./sql-scripts/* /sql-scripts/

EXPOSE 5432