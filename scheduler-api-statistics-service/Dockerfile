FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./startup.sh /app/
ADD ./target/scheduler-api-statistics-service.jar /app/
RUN chmod +x /app/startup.sh
CMD ["/app/startup.sh", "/app/scheduler-api-statistics-service.jar"]

EXPOSE 8080