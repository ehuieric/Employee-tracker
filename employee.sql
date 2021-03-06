DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;


USE employee_db;

CREATE TABLE department (
  
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
);

CREATE TABLE role (
  
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INTEGER(10),
  PRIMARY KEY (id),
);

CREATE TABLE employee (
  
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10),
  manager_id INTEGER(10),
  PRIMARY KEY (id),
);
