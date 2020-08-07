const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require("console.table");

// Creates the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'password',
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
      "Update An Employee Role",
      "Exit",
    ],
  },
];

// connect to the server and db
connection.connect(function (err) {
  if (err) throw err;
  console.log("\n Welcome to the Employee Tracker \n");
  // run the start function after the connection is made to prompt the user
  init();
});

// Offer main menu then prompt next function based on response
function init() {
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
      case "Update An Employee Role":
        updateEmployee();
        break;
      case "Exit":
        connection.end();
        break;
      default:
        connection.end();
    }
  });
  // update arrays each time the init function is called
  // getDepts();
  // getRoles();
  // getManagers();
}