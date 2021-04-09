FROM openjdk:11
MAINTAINER Andrew Kolesnyk

RUN mkdir /logs
ADD ./target/work-schedule-service.jar /app/
CMD ["java", "-jar", "/app/work-schedule-service.jar"]

EXPOSE 8080
