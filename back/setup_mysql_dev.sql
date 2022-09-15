-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS FinalProject;
CREATE USER IF NOT EXISTS 'final'@'localhost' IDENTIFIED BY 'proyectofinal';
GRANT ALL PRIVILEGES ON `FinalProject`.* TO 'final'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'final'@'localhost';
FLUSH PRIVILEGES;
