-- Drops the employeeTracker_db if it exists currently --
DROP DATABASE IF EXISTS
;
-- Creates the "employeeTracker_db" database --
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind(department_id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) UNSIGNED NOT NULL,
    last_name VARCHAR(30) UNSIGNED NOT NULL,
    INDEX first_name_ind(first_name_id),
    CONSTRAINT fk_employee1 FOREIGN KEY(first_id) REFERENCES employee(id) ON DELETE CASCADE,
    INDEX last_name_ind(last_name_id),
    CONSTRAINT fk_employee2 FOREIGN KEY(last_id) REFERENCES employee(id) ON DELETE CASCADE,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind(role_id),
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX man_ind(manager_id),
    CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
