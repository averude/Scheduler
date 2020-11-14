CREATE USER scheduler WITH ENCRYPTED PASSWORD 'scheduler';
CREATE DATABASE schedulerdb OWNER scheduler;
GRANT ALL PRIVILEGES ON DATABASE schedulerdb TO scheduler;
