FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-registry-server.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/scheduler-registry-server.jar"]

EXPOSE 8761