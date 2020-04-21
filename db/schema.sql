-- Drops the employeeTracker_DB if it exists currently --
DROP DATABASE IF EXISTS employeeTracker_db;
-- Creates the "animals_db" database --
CREATE DATABASE employeeTracker_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
full_name VARCHAR (30) NOT NULL
);

CREATE TABLE employee_role(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4) NOT NULL,
    department_id INT(30) NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES employee_role(id),
    manager_id INT(30),
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;