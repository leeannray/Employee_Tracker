// Create connection
const connection = require('./connection');

// Create class of Database and constructor of connection
class Database {
  constructor(connection) {
    this.connection = connection;
  }

  allEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findAllByDept(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }


  findAllByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }

  findAllManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }
  // Employee creation
  newEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  deleteEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // Role creation
  newRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  deleteRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  findAllDepts() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  // Department creation
  newDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  deleteDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?", departmentId
    );
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
    );
  }

  updateName(employeeId) {
    return this.connection.query(
      "UPDATE employee SET first_id = ? && last_id = ? WHERE id = ?",
      employeeId
    );
  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]
    );
  }

  updateEmployeeDept(employeeId, departmentId) {
    return this.connection.query(
      "UPDATE employee SET department_id = ? WHERE id = ?", [departmentId, employeeId]
    );
  }
};

// Export to be used
module.exports = new Database(connection);
