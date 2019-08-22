FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-backend-server.jar /app/
CMD ["java", "-jar", "/app/scheduler-backend-server.jar"]

EXPOSE 8080