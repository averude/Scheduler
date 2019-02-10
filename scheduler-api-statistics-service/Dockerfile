FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-api-statistics-service.jar /app/
CMD ["java", "-jar", "/app/scheduler-api-statistics-service.jar"]

EXPOSE 8080