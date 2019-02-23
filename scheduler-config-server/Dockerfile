FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-config-server.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/scheduler-config-server.jar"]

EXPOSE 8888