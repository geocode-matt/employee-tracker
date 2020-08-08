const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const asciiArt = require("ascii-art");
let departmentsArr = [];
let rolesArr = [];
let employeesArr = [];
let managersArr = [];

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'Norah2018#1',
  database: 'employees'
});

const mainMenu = [
  {
    type: "list",
    name: "mainMenu",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update An Employee's Role",
      "View Employees by Department",
      "View Employees by Role",
      "Exit",
    ],
  },
];

// connect to the server and db
connection.connect(function (err) {
  if (err) throw err;
  console.log("\n Welcome to the Employee Tracker \n");
  // run the start function after the connection is made to prompt the user
  start();
});

// Offer start menu then prompt next function based on response
function start() {
  inquirer.prompt(mainMenu).then((response) => {
    switch (response.mainMenu) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Department":
        department();
        break;
      case "Add Role":
        role();
        break; 
      case "Add Employee":
        employee();
        break;
      case "Update An Employee's Role":
        updateEmployee();
        break;
      case "View Employees by Department":
        viewByDepartment();
        break;
      case "View Employees by Role":
        viewByRole();
        break;    
      case "Exit":
        connection.end();
        break;
      default:
        connection.end();
    }
  });
  // update arrays each time
  getDepts();
  getRoles();
  getManagers();
}


//////////////////////////////////////////////////////////////
// Functions to update departments, roles, employees arrays //
//////////////////////////////////////////////////////////////

// Get all departments
function getDepts() {
  connection.query(`SELECT departmentName FROM department`, function (
    err,
    departments
  ) {
    if (err) throw err;
    departmentsArr = [];
    for (i = 0; i < departments.length; i++) {
      departmentsArr.push(departments[i].departmentName);
    }
    // console.log(departmentsArr);
  });
}
// Get all roles
function getRoles() {
  connection.query(`SELECT title FROM role`, function (err, roles) {
    if (err) throw err;
    rolesArr = [];
    for (i = 0; i < roles.length; i++) {
      rolesArr.push(roles[i].title);
    }
    // console.log(rolesArr);
  });
}
// Get all possible managers by last name
function getManagers() {
  connection.query(`SELECT employee.lastName FROM employee`, function (
    err,
    managers
  ) {
    if (err) throw err;
    employeesArr = [];
    for (i = 0; i < managers.length; i++) {
      managersArr.push(managers[i].lastName);
    }
    // console.log(managersArr);
  });
}


//////////////////////////////////////////////////////////////
////////// Functions to run start menu selections ////////////
//////////////////////////////////////////////////////////////

///////// View all departments ///////////////
function viewDepartments() {
  connection.query(`SELECT * FROM department`, function (err, data) {
    if (err) throw err;
    console.table(data);
    start();
  });
}

///////// View all roles ////////////////////
function viewRoles() {
  connection.query(`SELECT * FROM role`, function (err, data) {
    if (err) throw err;
    console.table(data);
    start();
  });
}

///////// View all employees ///////////////
function viewEmployees() {
  connection.query(
    `SELECT employee.employeeId, employee.firstName, employee.lastName, role.title,
  department.departmentName AS department,role.salary,CONCAT(a.firstName, " ", a.lastName) AS manager
  FROM employee
  LEFT JOIN role ON employee.roleId = role.roleId
  LEFT JOIN department ON role.departmentId = department.departmentId
  LEFT JOIN employee a ON a.employeeId = employee.managerId`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
}

/////////// Add Department ///////////////
function department() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is your department name?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          departmentName: answer.department,
        },
        function (err) {
          if (err) throw err;
        }
      );
      start();
    });
}

/////////// Add a Role ///////////////
function role() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the new role title.",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
          default: "0.00",
        },
        {
          name: "departmentName",
          type: "list",
          message: "What department will this role be in?",
          choices: departmentsArr,
        },
      ])
      .then(function (answer) {
        let deptID;
        for (let d = 0; d < res.length; d++) {
          if (res[d].departmentName == answer.departmentName) {
            deptID = res[d].departmentId;
          }
        }
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            departmentId: deptID,
          },
          function (err) {
            if (err) throw err;
          }
        );
        start();
      });
  });
}

////////// Add Employee /////////////////
function employee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    connection.query("SELECT * FROM employee", function (err, res2) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleName",
            type: "list",
            message: "What is the employee's role?",
            choices: rolesArr,
          },
          {
            name: "managerName",
            type: "list",
            message: "Who is this employee's Manager?",
            choices: managersArr,
          },
        ])
        .then(function (answer) {
          let roleID;
          for (let r = 0; r < res.length; r++) {
            if (res[r].title == answer.roleName) {
              roleID = res[r].roleId;
            }
          }
          let managerID;
          for (let m = 0; m < res2.length; m++) {
            if (res2[m].lastName == answer.managerName) {
              managerID = res2[m].employeeId;
            }
          }
          connection.query(
            "INSERT INTO employee SET ?",
            {
              firstName: answer.firstName,
              lastName: answer.lastName,
              roleId: roleID,
              managerId: managerID,
            },
            function (err) {
              if (err) throw err;
            }
          );
          start();
        });
    });
  });
}

//////////// Update an employee ///////////////////
function updateEmployee() {
  connection.query(
    `SELECT concat(employee.firstName, ' ' ,  employee.lastName) AS Name FROM employee`,
    function (err, employees) {
      if (err) throw err;
      employeesArr = [];
      for (i = 0; i < employees.length; i++) {
        employeesArr.push(employees[i].Name);
      }
      connection.query("SELECT * FROM role", function (err, res2) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "employeeChoice",
              type: "list",
              message: "Which employee would you like to update?",
              choices: employeesArr,
            },
            {
              name: "roleChoice",
              type: "list",
              message: "What is this employee's new role?",
              choices: rolesArr,
            },
          ])
          .then(function (answer) {
            let roleID;
            for (let r = 0; r < res2.length; r++) {
              if (res2[r].title == answer.roleChoice) {
                roleID = res2[r].roleId;
              }
            }
            connection.query(
              `UPDATE employee SET roleId = ? WHERE employeeId = (SELECT employeeId FROM(SELECT employeeId FROM employee WHERE CONCAT(firstName," ",lastName) = ?)AS NAME)`,
              [roleID, answer.employeeChoice],
              function (err) {
                if (err) throw err;
              }
            );
            start();
          });
      });
    }
  );
}

//////////// View employees by department  ///////////////////
function viewByDepartment() {
  connection.query(
    `SELECT employee.employeeId, employee.firstName, employee.lastName, department.departmentName FROM employee 
  LEFT JOIN role ON employee.roleId = role.roleId
  LEFT JOIN department ON role.departmentId = department.departmentId 
  ORDER BY department.departmentName`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
}

//////////// View employees by role  ///////////////////
function viewByRole() {
  connection.query(
    `SELECT employee.employeeId, employee.firstName, employee.lastName, role.title, role.salary, department.departmentName FROM employee 
    LEFT JOIN role ON employee.roleId = role.roleId
    LEFT JOIN department ON role.departmentId = department.departmentId 
    ORDER BY role.title`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
}

