FROM openjdk:11
MAINTAINER Andrew Kolesnyk

RUN mkdir /logs
ADD ./target/scheduler-backend-server.jar /app/
CMD ["java", "-jar", "/app/scheduler-backend-server.jar"]

EXPOSE 8080
