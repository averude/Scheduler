#!/bin/bash

##############################################
# This is the startup script of microservice #
# Author: Andrew Kolesnyk                    #
##############################################
#
# Usage: startup.sh [JAR_FILE_NAME]
#

# Check if arguments exist
if [ $# -eq 0 ]
then
    echo "ERROR: No arguments supplied"
fi

JAR_FILE=$1

# Check if config server is started
until $(curl -fsS http://scheduler-config-server:8888/actuator/health -o /dev/null);
do
    echo "Waiting for upcoming configuration server..."
    sleep 5
done

#Execute java application
java -jar $JAR_FILE