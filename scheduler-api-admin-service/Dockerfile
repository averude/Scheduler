FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-api-admin-service.jar /app/
CMD ["java", "-jar", "/app/scheduler-api-admin-service.jar"]

EXPOSE 8080