const { prompt } = require('inquirer');
const appLogo = require('asciiart-logo');
const data = require('./db');
const db = require('./db');
require('console.table');

init();

// Logo when main prompts load
function init() {
    let logo = appLogo({
        name: "EMPLOYEE DATABASE"
    }).render();
    console.log(logo);
    displayPrompts();

}

async function displayPrompts() {
    let { choice } = await prompt([
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
                value: "DEL_EMPLOYEE"
            },
            {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
                name: "Update Employee Name",
                value: "UPDATE_NAME"
            }
            {
                name: "Update Employee Manager",
                value: "UPDATE_EMPLOYEE_MAN"
            },
            {
                name: "View All Roles",
                value: "VIEW_ALL_ROLES"
            },
            {
                name: "Add Role",
                value: "ADD_ROLE"
            },
            {
                name: "Delete Role",
                value: "DEL_ROLE"
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
                value: "DEL_DEPT"
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
            return allEmployees();
            break;
        case "VIEW_EMPLOYEES_BY_DEPT":
            return viewEmployeesByDept();
            break;
        case "VIEW_EMPLOYEES_BY_MAN":
            return viewEmployeesByMan();
            break;
        case "ADD_EMPLOYEE":
            return addEmployee();
            break;
        case "DEL_EMPLOYEE":
            return delEmployee();
            break;
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
            break;
        case "UPDATE_EMPLOYEE_NAME":
            return updateEmployeeName();
            break;
        case "UPDATE_EMPLOYEE_MAN":
            return updateEmployeeMan();
            break;
        case "VIEW_ALL_ROLES":
            return viewAllRoles();
            break;
        case "ADD_ROLE":
            return addRole();
            break;
        case "DEL_ROLE":
            return delRole();
            break;
        case "VIEW_DEPTS":
            return viewDepts();
            break;
        case "ADD_DEPT":
            return addDept();
            break;
        case "DEL_DEPT":
            return delDept();
            break;
        default:
            return exit();

    }
}

async function allEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  displayPrompts();
}

async function viewEmployeesByDept() {
    const empDepts = await db.findAllDepartments();

    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    
    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Choose a department to view its employees: ",
            choices: departmentChoices
        }
    ]);

    const employeeDept = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    displayPrompts();
}

async function viewEmployeesByMan() {
    const employeeMan = await db.findAllEmployeesByManager();
    const manChoices = employeeMan.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to see records for?",
            choices: manChoices
        }
    ]);

    const employees = await db.findAllEmployeesByManager(managerId);

    console.log("\n");

    if (employees.length === 0) {
        console.log("The selected employee has no direct reports");
    } else {
        console.table(employees);
    }
    displayPrompts();
}

    const role = await inquirer.prompt([
        {
            name: 'title',
            message: "What is the name of the role?"
        },
        {
            name: 'salary',
            message: "What is the salary associated with this role?"
        },
        {
            type: 'list',
            name: 'departmentId',
            message: "What department does the role belong to?"
        }
    ]);
    await db.newRole(role);
    console.log(`${role.title} has been added to your employee database!`);
}

async function addDept() {
    const department = await db.
}
