DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department(
  departmentId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  roleId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  departmentId INT,
  FOREIGN KEY(departmentId) REFERENCES department(departmentId) ON DELETE CASCADE
);

CREATE TABLE employee(
  employeeId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT,
  managerId INT, 
  FOREIGN KEY(roleId) REFERENCES role(roleId) ON DELETE CASCADE,
  FOREIGN KEY(managerId) REFERENCES employee(employeeId) ON DELETE CASCADE
);