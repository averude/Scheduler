FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-config-server.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/scheduler-config-server.jar"]

HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8888/actuator/health || exit 1

EXPOSE 8888