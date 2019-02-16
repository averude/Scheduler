#!/bin/bash

ARCHIVE=./scheduler.tar

function fillTheArchive() {
    tar -uvf "$ARCHIVE" ./scheduler-api-{admin,schedule,statistics}-service/{Dockerfile,startup.sh}
    tar -uvf "$ARCHIVE" ./scheduler-api-{admin,schedule,statistics}-service/target/*-service.jar
    tar -uvf "$ARCHIVE" ./scheduler-{config,registry,gateway}-server/Dockerfile
    tar -uvf "$ARCHIVE" ./scheduler-{registry,gateway}-server/startup.sh
    tar -uvf "$ARCHIVE" ./scheduler-{config,registry,gateway}-server/target/*-server.jar
    tar -uvf "$ARCHIVE" ./scheduler-database-server/*
    tar -uvf "$ARCHIVE" ./docker-compose.yml
    tar -uvf "$ARCHIVE" ./.env
}

if [ ! -e "$ARCHIVE" ]; then
    printf "File %s doesn't exist. Creating new...\n" "$ARCHIVE"
    tar -cvf "$ARCHIVE" --files-from /dev/null
    fillTheArchive
else
    printf "File %s exists. Updating files...\n" "$ARCHIVE"
    fillTheArchive
fi
