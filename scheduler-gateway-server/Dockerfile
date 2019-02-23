FROM java:8-jre
MAINTAINER Andrew Kolesnyk

ADD ./startup.sh /app/
ADD ./target/scheduler-gateway-server.jar /app/
RUN chmod +x /app/startup.sh
CMD ["/app/startup.sh", "/app/scheduler-gateway-server.jar"]

EXPOSE 4000