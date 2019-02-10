FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-api-schedule-service.jar /app/
CMD ["java", "-jar", "/app/scheduler-api-schedule-service.jar"]

EXPOSE 8080