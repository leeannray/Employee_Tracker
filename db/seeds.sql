USE employeeTracker_db;
INSERT INTO department (name)
VALUES ("Web Development"),
    ("Full-Stack"),
    ("Front-End"),
    ("Back-End"),
    ("UI/UX");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior", 65000, 1),
("Junior", 55000, 1),
("Senior", 68000, 2),
("Team Lead", 100000, 2),
("Senior", 70000, 3),
("Intern", 50000, 1),
("Manager", 125000, 1),
("Manager", 125000, 2),
("Manager", 125000, 3);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lee Ann", "Norman", 1, NULL),
("Jonathan", "Cool", 2, 1),
("Brian", "Genius", 4, 3),
("Jorge", "Awesome", 5, NULL),
("Miguel", "Smart", 6, 2),
("Robyn", "Nice", 7, 2);