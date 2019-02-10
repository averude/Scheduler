FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-gateway-server.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/scheduler-gateway-server.jar"]

EXPOSE 4000