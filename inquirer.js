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
            "VIEW employee",
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
        name: "first_name",
        type: "input",
        message: "What is the employee first name?" 
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee last name?" 
      },
      
        {
          name: "role_id",
          type: "input",
          message: "What is the employee role_id?" 
        },

        {
          name: "manager_id",
          type: "input",
          message: "What is the employee manager_id?" 
        }
      ])
      .then(function(answers) {
        console.log("answer",answers);
          var query = "INSERT INTO employee SET ?";
            connection.query(query, 
              { 
                first_name: answers.first_name ,
                last_name: answers.last_name ,
                manager_id: answers.manager_id,
                role_id: answers.role_id
            },
               function(err, res) {
              if (err) throw err;
             console.log("your employee was created");
            });
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
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "id: " +
          res[i].id +
          " || title: " +
          res[i].title  +
          " || salary: " +
          res[i].salary +
          " || deparment_id: " +
          res[i].deparment_id
      );
    }
    runAction();
  });
}


function viewEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "id: " +
          res[i].id +
          " || firstName: " +
          res[i].first_name  +
          " || lastName: " +
          res[i].last_name +
          " || role_id: " +
          res[i].role_id +
          " || manager_id: " +
          res[i].manager_id
      );
    }
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
  .prompt([
    {
      name: "role",
      type: "input",
      message: "which role would you like to update?"
    },
    {
      name: "newRole",
      type: "input",
      message: "what is the role update ?"
    
  },
 ])
  .then(function(answers) {
    var query = "UPDATE role SET title = ? WHERE title = ?"

    connection.query( query, 
      [
        answers.newRole, 
        answers.role,
      ], 
      
      function(error) {
        if (error) throw err;
      console.log("role updated successfully!");
      runAction();
   }
  )
  });
}

function updateEmployee() {
  inquirer
  .prompt([
    {
      name: "employee",
      type: "input",
      message: "which employe would you like to update?"
    },
    {
      name: "newEmployee",
      type: "input",
      message: "what is the employee update ?"
    
  },
 ])
  .then(function(answers) {

    var query = "UPDATE employee SET first_name = ? WHERE first_name = ?"

    connection.query( query, 
      [
        answers.newEmployee, 
        answers.employee,
      ], 
      
      function(error) {
        if (error) throw err;
    console.log("employee updated successfully!");
    runAction();
  }
  )
  });
}


