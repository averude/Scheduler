FROM java:8-jre
MAINTAINER Andrew Kolesnyk

RUN mkdir /app/department-icons
ADD ./target/scheduler-backend-server.jar /app/
CMD ["java", "-jar", "/app/scheduler-backend-server.jar"]

EXPOSE 8080