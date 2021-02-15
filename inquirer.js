var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Assemian-1",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runAction();
});

  
function runAction() {
    inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "Would you like to ADD, VIEW or UPDATE",
          choices: [
            "ADD department", 
            "ADD role",
            "ADD employee",
            "VIEW department",
            "VIEW role",
            "view employee",
            "UPDATE department",
            "UPDATE role",
            "UPDATE employee",
            "COMPLETE"
           ],
        })

        .then(function(answer) { 
          console.log('answers', answer);
            switch (answer.action) {
            case "ADD department":
              console.log('adding department');
              addDepartment();
              break;
      
            case "ADD role":
              addRole();
              break;
      
            case "ADD employee":
              addEmployee();
              break;
      
            case "VIEW department":
              viewDepartment();
              break;
      
            case "VIEW role":
               viewRole();
              break;

            case "VIEW employee":
              viewEmployee();
              break;

            case "UPDATE role":
               updateRole();
            break;

            case "UPDATE department":
               updateDepartment();
              break;

            case "UPDATE employee":
              updateEmployee();
                break;

            case "exit":
              connection.end();
                break;
            }
          });
      }

function addDepartment() {
          inquirer
          .prompt({
            name: "department",
            type: "input",
            message: "What department?" 
          })
          .then(function(answer) {
            console.log("answer",answer);
            var query = "INSERT INTO department SET ?";
            connection.query(query, { name: answer.department}, function(err, res) {
              if (err) throw err;
             console.log("your department was created");
            });
            runAction();  
          });
}
      
function addRole() {
        inquirer
        .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title?" 
        },
        {
          name: "salary",
          type: "input",
          message: "what is the salary?" 
        },
        {
          name: "department",
          type: "input",
          message: "What department_id?" 
        }
      ])   
        .then(function(answers) {
          console.log("answer",answers);
          var query = "INSERT INTO role SET ?";
            connection.query(query, 
              { department_id: answers.department ,
                salary: answers.salary ,
                title: answers.title
            },
               function(err, res) {
              if (err) throw err;
             console.log("your role was created");
            });
          runAction();
        });
}

function addEmployee() {
      inquirer
      .prompt([
        {
        name: "employee",
        type: "input",
        message: "What is the employee first name?" 
      },
      {
        name: "employee",
        type: "input",
        message: "What is the employee last name?" 
      },
      
        {
          name: "employee",
          type: "input",
          message: "What is the employee role_id?" 
        },

        {
          name: "employee",
          type: "input",
          message: "What is the employee manager_id?" 
        }
      ])
      .then(function(answer) {
        console.log("answer",answer);
        runAction();
      });
      }

function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "id: " +
          res[i].id +
          " || name: " +
          res[i].name 
      );
    }
    runAction();
  });
}

function viewRole() {
  inquirer
  .prompt({
  })
  .then(function(answer) {
    console.log("answer",answer);
    runAction();
  });
}


function viewEmployee() {
  inquirer
  .prompt({
  })
  .then(function(answer) {
    console.log("answer",answer);
    runAction();
  });
}

function updateDepartment() {
      inquirer
    .prompt([
    {
      name: "department",
      type: "input",
      message: "which department would you like to update?"
    },
    {
      name: "newDepartment",
      type: "input",
      message: "what is the department update ?"
    },
  ])
  .then(function(answers) {
    var query = "UPDATE department SET name = ? WHERE name = ?"

    connection.query( query, 
      [
        answers.newDepartment, 
        answers.department,
      ], 
      
      function(error) {
        if (error) throw err;
        console.log("department updated successfully!");
        runAction();
      }
    )
  })
}


function updateRole() {
  inquirer
  .prompt({
    
  })
  .then(function(answer) {
    console.log("answer",answer);
    runAction();
  });
}

function updateEmployee() {
  inquirer
  .prompt({
    
  })
  .then(function(answer) {
    console.log("answer",answer);
    runAction();
  });
}

