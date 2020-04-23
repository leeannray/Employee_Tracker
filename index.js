const { prompt } = require('inquirer');
const appLogo = require('asciiart-logo');
const db = require('./db/index');
const dB = require('./db');
const Questions = require('./db/questions');
require('console.table');

start();

// Logo when main prompts load
function start() {
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
            value: "viewEMPLOYEES",
          },
          {
            name: "View All Employees By Department",
            value: "employees_byDEPT",
          },
          {
            name: "View All Employees By Manager",
            value: "employees_byMAN",
          },
          {
            name: "Add Employee",
            value: "addEMPLOYEE",
          },
          {
            name: "Delete Employee",
            value: "delEMPLOYEE",
          },
          {
            name: "Update Employee Info",
            value: "UPDATE_INFO",
          },
          {
            name: "Update Employee Role",
            value: "update_employeeROLE",
          },
          {
            name: "Update Employee Name",
            value: "UPDATE_NAME",
          },
          {
            name: "Update Employee Manager",
            value: "update_employeeMAN",
          },
          {
            name: "Update Employee Department",
            value: "update_employeeDEPT",
          },
          {
            name: "View All Roles",
            value: "viewROLES",
          },
          {
            name: "Add Role",
            value: "addROLE",
          },
          {
            name: "Delete Role",
            value: "delROLE",
          },
          {
            name: "View All Departments",
            value: "viewDEPTS",
          },
          {
            name: "Add Department",
            value: "addDEPT",
          },
          {
            name: "Delete Department",
            value: "delDEPT",
          },
          {
            name: "View All Managers",
            value: "viewManagers",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ]);

    switch (choice) {
      case "viewEMPLOYEES":
        return totalEmployees();
        break;
      case "employees_byDEPT":
        return viewEmployeesByDept();
        break;
      case "employees_byMAN":
        return viewEmployeesByMan();
        break;
      case "addEMPLOYEE":
        return addEmployee();
        break;
      case "delEMPLOYEE":
        return delEmployee();
        break;
      case "UPDATE_EMPLOYEE_INFO":
        return updateInfo();
        break;
      case "update_employeeROLE":
        return updateEmployeeRole();
        break;
      case "UPDATE_NAME":
        return updateEmployeeName();
        break;
      case "viewManagers":
        return viewAllManagers();
        break;
      case "update_employeeMAN":
        return updateEmployeeMan();
        break;
      case "update_empoloyeeDEPT":
        return updateEmployeeDept();
        break;
      case "viewROLES":
        return viewAllRoles();
        break;
      case "addROLE":
        return addRole();
        break;
      case "delROLE":
        return delRole();
        break;
      case "viewDEPTS":
        return viewDepts();
        break;
      case "addDEPT":
        return addDept();
        break;
      case "delDEPT":
        return delDept();
        break;
      case "exitDB":
        return exit();
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
        Questions.getTableChoice("list", "departmentId", "Select a department", deptChoices)
    );
    const employees = await db.findAllByDept(departmentId);

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
      Questions.getTableChoice("list", "managerId", "Select a manager", manChoices)
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


    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

const roleChoices = roles.map(({ id, title }) => ({
  name: title,
  value: id
}));

    const { roleId } = await prompt(
        Questions.getTableChoice(
            "list", "roleId", "Select a role", roleChoices
        ));


 employee.role_id = roleId;

const manChoices = employees.map(({ id, first_name, last_name }) => ({
  name: `${first_name} ${last_name}`,
  value: id
}));

manChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt(
        Questions.getTableChoice("list", "managerId", "Select a manager", manChoices)
    );

employee.manager_id = managerId;

await db.newEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );



    displayPrompts();
}



async function delEmployee() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { employeeId } = await prompt(
        Questions.getTableChoice("list", "employeeId", "Select an employee to delete", employeeChoices)
  );

  await db.deleteEmployee(employeeId);

  console.log("Employee has been removed from your database.");

  displayPrompts();
}

async function updateEmployeeDept() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt(
    Questions.getTableChoice("list", "employeeId", "Select an employee", employeeChoices)
  );

  const depts = await db.findAllDepts();

  const deptChoices = depts.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt(
    Questions.getTableChoice("list",
      "departmentId",
      "Select a department",
      deptChoices
    )
  );

  await db.updateEmployeeDept(employeeId, departmentId);

  console.log("Updated employee's department");

  displayPrompts();
}

async function updateEmployeeRole() {
    const employees = await db.allEmployees();


    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt(
      Questions.getTableChoice(
        "list",
        "employeeId",
        "Select an employee",
        employeeChoices
      )
    );

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt(
      Questions.getTableChoice("list", "roleId", "Select a role", roleChoices)
    );

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

    const { employeeId } = await prompt(
      Questions.getTableChoice(
        "list",
        "employeeId",
        "Select an employee",
        employeeChoices
      )
    );

  const managers = await db.findAllManagers(employeeId);

  const manChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

    const { managerId } = await prompt(
      Questions.getTableChoice(
        "list",
        "managerId",
        "Select a manager",
        manChoices
      )
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
        "list",
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

    const { roleId } = await prompt(
      Questions.getTableChoice("list", "roleId", "Select a role", roleChoices)
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

async function viewAllManagers() {
  const managers = await db.findAllManagers();

  console.table(managers);

  displayPrompts();
};

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

function exit() {

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
