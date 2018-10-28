
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
            "View Products for Sale", 
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          view();
          break;
  
        case "View Low Inventory":
          low();
          break;
  
        case "Add to Inventory":
          
          break;
  
        case "Add New Product":
          
          break;
        }
      });
  }
  
  function view() {

    const query = db.query("SELECT * FROM products", (err, productData) => {

        if (err)
            throw err;

        productData.forEach(product => {
            console.log(`
===========${product.product_name}===========
Product ID: ${product.id}      
Product name: ${product.product_name} 
Price: $${product.price}
Stock: ${product.stock_quantity}

`);
        });start();
    });
}

function low() {
    const query = "SELECT id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    db.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log( "\n\n======================"+ "\nProduct ID: " + res[i].id + "\n" + "Product Name: " + res[i].product_name + "\n"+ "Product Quantity: " + res[i].stock_quantity+ "\n\n\n");
      }
      start();
    });
  }