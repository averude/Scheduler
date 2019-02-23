FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./startup.sh /app/
ADD ./target/scheduler-registry-server.jar /app/
RUN chmod +x /app/startup.sh
CMD ["/app/startup.sh", "/app/scheduler-registry-server.jar"]

EXPOSE 8761