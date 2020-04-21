-- Drops the employeeTracker_DB if it exists currently --
DROP DATABASE IF EXISTS employeeTracker_db;
-- Creates the "animals_db" database --
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
full_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT(30) NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT(30),
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;