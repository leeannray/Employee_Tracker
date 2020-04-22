const inquirer = require('inquirer');
const appLogo = require('asciiart-logo');
const database = require('./db');
require('console.table');

start();
function start() {
    let logo = appLogo({
        name: "EMPLOYEE DATABASE"
    }).render();
    console.log(logo);
}

async function mainMenu() {
    let {choice} = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Welcome to your Employee Database. What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MAN"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Delete Employee",
                    value: "DELETE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MAN"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ALLROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Delete Role",
                    value: "DELETE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPT"
                },
                {
                    name: "Delete Department",
                    value: "DELETE_DEPT"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }
            ]
        }
    ]);
    switch (choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPT":
        return viewEmployeesByDept();
        break;
      case "VIEW_EMPLOYEES_BY_MAN":
        return viewEmployeesByMan();
        break;
    }


}