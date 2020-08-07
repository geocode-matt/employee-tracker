USE employee_DB;

-- Seeds for department
INSERT INTO department (departmentId , departmentName)
VALUES (1, "Human Resources");

INSERT INTO department (departmentId , departmentName)
VALUES (2, "Sales");

INSERT INTO department (departmentId , departmentName)
VALUES (3, "Engineering");

INSERT INTO department (departmentId , departmentName)
VALUES (4, "Business Development");

INSERT INTO department (departmentId , departmentName)
VALUES (5, "IT");

-- Seeds for role
INSERT INTO role (roleId, title, salary, departmentId)
VALUES (1, "HR Associate", 40000, 1);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (2, "HR Manager", 80000, 1);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (3, "Sales Manager", 75000, 2);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (4, "Sales Associate", 40000, 2);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (5, "Engineering Manager", 150000, 3);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (6, "Engineer", 95000, 3);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (7, "Business Development Manager", 85000, 4);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (8, "Business Development Associate", 50000, 4);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (9, "IT Associate", 75000, 5);

INSERT INTO role (roleId, title, salary, departmentId)
VALUES (10, "IT Manager", 145000, 5);

-- Seeds for employee

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (1, "Luna", "Chadwick", 3, null);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (2, "Chandler", "Garrett", 2, null);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (3, "Meera", "Noble", 6, null);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (4, "Tj", "Wu", 10, null);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (5, "Izzy", "Baines", 7, null);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (6, "Rhea", "Pruitt", 4, 1);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (7, "Eleni", "Robertson", 8, 5);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (8, "Naima", "Gaines", 1, 2);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (9, "Qasim", "Maddox", 9, 4);

INSERT INTO employee (employeeId, firstName, lastName, roleId, managerId)
VALUES (10, "Maurice", "Ryder", 5, 3);