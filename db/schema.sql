-- Drops the employeeTracker_db if it exists currently --
DROP DATABASE IF EXISTS employeeTracker_db;
-- Creates the "employeeTracker_db" database --
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT KEY NOT NULL,
name VARCHAR(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 4) DEFAULT(0),
    department_id INT,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_role FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT(30),
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE CASCADE SET NULL
);

