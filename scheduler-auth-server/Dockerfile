FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./target/scheduler-auth-server.jar /app/
CMD ["java", "-jar", "/app/scheduler-auth-server.jar"]

EXPOSE 5000