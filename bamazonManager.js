
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
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    view();
                    break;

                case "View Low Inventory":
                    low();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
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
        }); start();
    });
}

function low() {
    const query = "SELECT id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    db.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n\n======================" + "\nProduct ID: " + res[i].id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Product Quantity: " + res[i].stock_quantity + "\n\n\n");
        }
        start();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
            name: "id",
            message: "Which product you want to add more inventory? (from 1 - 10)",
            default: 2,
            type: "input",
            validate: function (idNumber) {
                if (!isNaN(idNumber)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
            {
                name: "stock_quantity",
                message: "Type in the unit of the product you want to restock",
                default: 10,
                type: "input",
                validate: function (stockNumber) {
                    if (!isNaN(stockNumber)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            ]).then(addInfo => {

            var query = db.query("SELECT * FROM products WHERE id=?", [addInfo.id], function (err, res) {
                for (var i = 0; i < res.length; i++) {

                    // console.log("\n"+"\n"+"\n"+"===========Your Add===========\n"+"Id: " + res[i].id + "\n" + "Product Name: " + res[i].product_name+"\n"+"Product Price: $"+ res[i].stock_quantity);
                    var newStock = parseInt(res[i].stock_quantity) + parseInt(addInfo.stock_quantity);

                    var parsedStock = parseInt(newStock)

                    console.log("Id: " + res[i].id + "\n" + "Product Name: " + res[i].product_name +"\n" +"Stock Updated: " + parsedStock);

                    updateItem(res[i].id, parsedStock );

                }
            });
        });
}


const updateItem = (id, stock_quantity) => {
    db.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: stock_quantity,
        },
        {
            id: id,
        }
    ], (err, result) => {
        if (err) throw err;
        
        start()
    })
} 

// function to handle posting new items up for auction
function addProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the item you would like to add?"
        },
        {
          name: "department",
          type: "input",
          message: "What department would you like to place your product in?"
        },
        {
          name: "price",
          type: "input",
          message: "What price you like your product to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many you like your product's quantity to be?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        db.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock_quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }

