
//require dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const db = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "268426845",
    database: "bamazon"
});

// connect to the mysql server and sql database
db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    view();
                    break;

                case "Create New Department":
                    newDept();
                    break;

            }
        });
}

// function view() {

//     const query = db.query("SELECT * FROM products", (err, productData) => {

//         if (err)
//             throw err;

//         productData.forEach(product => {
            
//             console.log(`
// ===========${product.product_name}===========
// Product ID: ${product.id}      
// Product name: ${product.product_name} 
// Price: $${product.price}
// Stock: ${product.stock_quantity}

// `);
//         }); start();
//     });
// }


// function view() {
//     const query = "SELECT department_name, COUNT(*) AS items FROM products GROUP BY department_name HAVING COUNT(*)>=1";
    
//     // var departments = [];
    
//     db.query(query, function (err, res) {
//         for (var i = 0; i < res.length; i++) {
//             console.log("\n\n" + "Product Department: " + res[i].department_name + "\n"+ "Product Counts: "+res[i].items+"\n");

//             // var ddd = res[i].department_name

//             // departments.push(ddd);
        
//         }
//         // console.log(departments);


//     });

    
// }


function view() {
    db.query("INSERT INTO departments(department_name) SELECT department_name FROM products", function(err, res) {
      if (err) throw err;
  
      // Log all results of the SELECT statement
      console.log(res);
      deleteD();
    });
  }

function deleteD(){
     db.query("DELETE FROM departments WHERE department_name IN (SELECT department_name FROM(SELECT department_name FROM departments GROUP BY department_name HAVING count(department_name) > 1) "+
     "AND department_id NOT IN (SELECT department_name FROM(SELECT min(department_id)FROM departments GROUP BY department_name HAVING count(department_name) > 1) ",function(err, res) {
        if (err) throw err;
  
     });
}