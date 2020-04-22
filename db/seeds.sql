USE employeeTracker_db;

INSERT INTO department
    (name)
VALUES
    ('Full-Stack Web Development'),
    ('Web Design'),
    ('Front-End Development'),
    ('Back-End Development');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Lead', 150000, 1),
    ('Senior Developer', 100000, 1),
    ('Senior Designer', 225000, 2),
    ('Junior Designer', 160000, 2),
    ('Project Manager', 175000, 3),
    ('Senior Front-End Dev', 225000, 3),
    ('Senior Back-End Dev', 100000, 4),
    ('Lead Back-End Dev', 500000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Lee Ann', 'Norman', 1, NULL),
    ('Robyn', 'Nice', 2, 1),
    ('Miguel', 'Cutedog', 3, NULL),
    ('Jorge', 'Silly', 4, 3),
    ('Jonathan', 'Brilliant', 5, NULL),
    ('Brian', 'Genius', 6, 5),
    ('Someone', 'Idontknow', 7, NULL),
    ('Classmate', 'Alsodontknow', 8, 7);