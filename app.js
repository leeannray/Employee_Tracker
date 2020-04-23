const { prompt } = require('inquirer');
const appLogo = require('asciiart-logo');
const db = require('./db/index');
const Questions = require('./db/questions');
require('console.table');

init();

// Logo when main prompts load
function init() {
    let logo = appLogo({
        name: "EMPLOYEE DATABASE"
    }).render();
    console.log(logo);

    displayPrompts();

};


async function displayPrompts() {
    let { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message:
          "Welcome to your Employee Database. What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPT",
          },
          {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MAN",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Delete Employee",
            value: "DEL_EMPLOYEE",
          },
          {
            name: "Update Employee Info",
            value: "UPDATE_INFO",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "Update Employee Name",
            value: "UPDATE_NAME",
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MAN",
          },
          {
            name: "Update Employee Department",
            value: "UPDATE_EMPLOYEE_DEPT",
          },
          {
            name: "View All Roles",
            value: "VIEW_ALL_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Delete Role",
            value: "DEL_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPT",
          },
          {
            name: "Delete Department",
            value: "DEL_DEPT",
          },
          {
            name: "Exit",
            value: "EXIT",
          },
        ],
      },
    ]);

    switch (choice) {
      case "VIEW_EMPLOYEES":
        return totalEmployees();
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
      case "UPDATE_EMPLOYEE_INFO":
        return updateInfo();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
        break;
      case "UPDATE_NAME":
        return updateEmployeeName();
        break;
      case "UPDATE_EMPLOYEE_MAN":
        return updateEmployeeMan();
        break;
      case "UPDATE_EMPLOYEE_DEPT":
        return updateEmployeeDept();
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
        case "EXIT":
            connection.end();
        default:
            connection.end();
    }
}

async function totalEmployees() {
    const employees = await db.allEmployees();

    console.table(employees);
    displayPrompts();
}


async function viewEmployeesByDept() {
    const departments = await db.findAllDepts();

    const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt(
        Questions.getTableChoice("departmentId", "Select a department", deptChoices)
    );
    const employees = await db.findAllByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    displayPrompts();
}



async function viewEmployeesByMan() {
  const managers = await db.allEmployees();

  const manChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { managerId } = await prompt(
      Questions.getTableChoice("managerId", "Select a manager", manChoices)
    );

  const employees = await db.findAllByManager(managerId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("No reports")
  } else {
    console.table(employees);
  }

  displayPrompts();
}


async function addEmployee() {


const roles = await db.findAllRoles();
    const employees = await db.allEmployees();
    const departments = await db.findAllDepts();

const employee = await prompt([
  {
    name: "first_name",
    message: "What is the employee's first name?",
  },
  {
    name: "last_name",
    message: "What is the employee's last name?",
  },
]);

const roleChoices = roles.map(({ id, title }) => ({
  name: title,
  value: id,
}));

    const { roleId } = await prompt(
        Questions.getTableChoice("roleId", "Select a role", roleChoices)
    );

employee.role_id = roleId;

const manChoices = employees.map(({ id, first_name, last_name }) => ({
  name: `${first_name} ${last_name}`,
  value: id,
}));

manChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt(
        Questions.getTableChoice("managerId", "Select a manager", manChoices)
    );

employee.manager_id = managerId;

const deptChoices = departments.map(({ id, name }) => ({
  name: name,
  value: id,
}));
    const { departmentId } = await prompt(
        Questions.getTableChoice("departmentId", "Select a department", deptChoices)
    );

    employee.department_id = departmentId;

await db.newEmployee(employee);

console.log(
  `${employee.first_name} ${employee.last_name} added to database`
);


    displayPrompts()
}



async function delEmployee() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { employeeId } = await prompt(
        Questions.getTableChoice("employeeId", "Select an employee to delete", employeeChoices)
  );

  await db.deleteEmployee(employeeId);

  console.log("Employee has been removed from your database.");

  displayPrompts();
}



async function updateEmployeeRole() {
    const employees = await db.allEmployees();


    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt(
      Questions.getTableChoice("employeeId", "Select an employee", employeeChoices)
    );

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt(Questions.getTableChoice("roleId", "Select a role", roleChoices));

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Employee's role has been updated successfully.");

    displayPrompts();
};

async function updateEmployeeMan() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { employeeId } = await prompt(Questions.getTableChoice("employeeId", "Select an employee", employeeChoices)
    );

  const managers = await db.findAllManagers(employeeId);

  const manChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { managerId } = await prompt(Questions.getTableChoice("managerId", "Select a manager", manChoices)
    );

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's manager");

  displayPrompts();
};

async function viewAllRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  displayPrompts();
}


async function addRole() {
    const departments = await db.findAllDepts();

    const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await prompt([
        {
            name: "title",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            message: "What is the salary of the role?"
        }
    ]);
    const department_Id = await prompt(
        Questions.getTableChoice(
            "departmentId",
            "Select a department",
            deptChoices
        )
    );
     employee.department_id = departmentId;




  await db.newRole(role,);

  console.log(`Added ${role.title} to database`);

  displayPrompts();
};

async function delRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

    const { roleId } = await prompt(Questions.getTableChoice("roleId", "Select a role", roleChoices)
    );


    await db.deleteRole(roleId);



  console.log(`Removed role from the database`);

  displayPrompts();
}


async function viewDepts() {
  const departments = await db.findAllDepts();


  console.table(departments);

    displayPrompts();
}
async function addDept() {

  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);

  await db.newDepartment(department);

  console.log(`${department.name} added to database`);

  displayPrompts();
};

async function delDept() {
  const departments = await db.findAllDepts();

  const deptChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

    const { departmentId } = await prompt(Questions.getTableChoice("departmentId", "Choose a department", deptChoices)
    );

  await db.deleteDepartment(departmentId);

  console.log(`${department.name} deleted from database`);

  displayPrompts();
}

function exit() => {
    console.log("Until later!");
    process.exit();
}

async function updateInfo() {
    // let info = {
    //     employees: async allEmployees() { await db.findAllEmployees() },
    //     managers: async viewEmployeesByMan() { await db.findAllPossibleManagers },
    //     roles: const roles = await db.findAllRoles();
    // const depts = await db.findAllDepartments();
    // ])

    // const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    //     name: `${first_name} ${last_name}`,
    //     value: id
    // }));


    // const { employeeId } = await prompt([
    //     {
    //         type: "list",
    //         name: "employeeId",
    //         message: "Which employee would you like to update?",
    //         choices: employeeChoices
    //     }
    //     return (response);
    // ]);

    // await prompt([
    //     {
    //         type: "list",
    //         name: "options",
    //         message: "Please select which of the below you'd like to update for the selected employee:",
    //         choices: ["Name", "Manager", "Department", "Role"]
    //     }])


}

//   const managerChoices = managers.map(({ id, first_name, last_name }) => ({
//     name: `${first_name} ${last_name}`,
//     value: id
//   }));

//   const { managerId } = await prompt([
//     {
//       type: "list",
//       name: "managerId",
//       message: "Which employee do you want to view direct reports for?",
//       choices: managerChoices
//     }
//   ]);

//   const employees = await db.findAllEmployeesByManager(managerId);

//   console.log("\n");

//   if (employees.length === 0) {
//     console.log("The selected employee has no reports");
//   } else {
//     console.table(employees);
//   }

//   loadMainPrompts();
// }

//     const employees = await db.findAllEmployeesByDepartment(departmentId);
//     console.log("\n");
//     console.table(employees);

//     displayPrompts();
// }

//   console.log("\n");
//   console.table(employeeDept);

//   displayPrompts();
// }

// async function viewEmployeesByMan() {
//   const employeeMan = await db.findAllEmployeesByManager();

//   console.log("\n");
//   console.table(employeeMan);

//   displayPrompts();
// }

// async function delEmployee() {
//   const removeEmployee = await db.deleteEmployee();

//   console.log("\n");
//   console.table(removeEmployee);

//   displayPrompts();
// }

// async function addEmployee() {
//   const newEmployee = await db.createEmployee();

//   console.log("\n");
//   console.table(newEmployee);

//   displayPrompts();
// }

// async function delDept() {
//   const deleteDept = await db.deleteDepartment();

//   console.log("\n");
//   console.table(deleteDept);

//   displayPrompts();
// }

// async function delRole() {
//   const deleteRole = await db.deleteRole();

//   console.log("\n");
//   console.table(deleteRole);

//   displayPrompts();
// }

// async function updateEmployeeMan() {
//   const newMan = await db.updateEmployeeManager();

//   console.log("\n");
//   console.table(newMan);

//   displayPrompts();
// }

// async function updateEmployeeDept() {
//   const newDept = await db.updateEmployeeDepartment();

//   console.log("\n");
//   console.table(newDept);

//   displayPrompts();
// }

// async function updateEmployeeName() {
//   const newName = await db.updateName();

//   console.log("\n");
//   console.table(newName);

//   displayPrompts();
// }

//     const { departmentId } = await prompt([
//         {
//             type: "list",
//             name: "departmentId",
//             message: "Choose a department to view its employees: ",
//             choices: departmentChoices
//         }
//     ]);

//     const employeeDept = await db.findAllEmployeesByDepartment(departmentId);

//     console.log("\n");
//     console.table(employees);

//     displayPrompts();
// }

// async function viewEmployeesByMan() {
//     const employeeMan = await db.findAllEmployeesByManager();
//     const manChoices = employeeMan.map(({ id, first_name, last_name }) => ({
//         name: `${first_name} ${last_name}`,
//         value: id
//     }));

//     const { managerId } = await prompt([
//         {
//             type: "list",
//             name: "managerId",
//             message: "Which employee do you want to see records for?",
//             choices: manChoices
//         }
//     ]);

//     const employees = await db.findAllEmployeesByManager(managerId);

//     console.log("\n");

//     if (employees.length === 0) {
//         console.log("The selected employee has no direct reports");
//     } else {
//         console.table(employees);
//     }
//     displayPrompts();
// }

//     const role = await inquirer.prompt([
//         {
//             name: 'title',
//             message: "What is the name of the role?"
//         },
//         {
//             name: 'salary',
//             message: "What is the salary associated with this role?"
//         },
//         {
//             type: 'list',
//             name: 'departmentId',
//             message: "What department does the role belong to?"
//         }
//     ]);
//     await db.newRole(role);
//     console.log(`${role.title} has been added to your employee database!`);
// }

// async function addDept() {
//     const department = await db.
// }
