-- create database and the user

SET GLOBAL validate_password.policy=LOW;
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'cruise'@'localhost';
CREATE DATABASE IF NOT EXISTS cruise_db;
CREATE USER IF NOT EXISTS 'cruise'@'localhost' IDENTIFIED BY 'cruise_v1.0';
GRANT ALL PRIVILEGES ON cruise_db.* TO 'cruise'@'localhost';
GRANT SELECT ON performance_schema.* TO 'cruise'@'localhost';
FLUSH PRIVILEGES;
