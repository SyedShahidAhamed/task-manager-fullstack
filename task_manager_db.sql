CREATE DATABASE IF NOT EXISTS task_manager_db;

CREATE USER IF NOT EXISTS 'task_user'@'localhost' IDENTIFIED BY 'task_password';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'task_user'@'localhost';
FLUSH PRIVILEGES;
