
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
    printStats();
});


function printStats() {

    

    const query = db.query("SELECT * FROM products", (err, productData) => {

        if (err)
            throw err;

        productData.forEach(product => {
            console.log(`
===========${product.product_name}===========
Product ID: ${product.id}      
Product name: ${product.product_name} 
Category: ${product.department_name}
Price: $${product.price}
Stock: ${product.stock_quantity}

`);
        });

        purchasePrompt();
    });
}



function purchasePrompt() {
   
    db.query("SELECT * FROM products", function (err, items) {
        if (err) throw err;
        
        inquirer
            .prompt([
                {
                    name: "id",
                    message: "Type in the ID of the product you want to purchase (from 1 - 10)",
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
                    message: "Type in the unit of the product you want to purchase",
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

            ]).then(purchaseInfo => {

                var query = db.query("SELECT * FROM products WHERE id=?", [purchaseInfo.id], function(err, res) {
                    for (var i = 0; i < res.length; i++) {

                        

                        console.log("\n"+"\n"+"\n"+"===========Your Purchase===========\n"+"Id: " + res[i].id + "\n" + "Product Name: " + res[i].product_name+"\n"+"Product Price: $"+ res[i].price);
                        var newStock = res[i].stock_quantity - purchaseInfo.stock_quantity;
                        

                        if (purchaseInfo.stock_quantity < res[i].stock_quantity){

                            console.log("Quantity left:"+ newStock);
                      
                      var cost = res[i].price * purchaseInfo.stock_quantity;
                      console.log("Your total cost will be: $"+ cost + "\n"+"\n"+"\n");

                      var productSales = purchaseInfo.stock_quantity * res[i].price;

                      console.log(productSales)

                      updateItem(res[i].id, newStock);
                    } else {
                        console.log("Sorry, we only got " + res[i].stock_quantity + " left in the stock, please adjust the quantity");
                        printStats();
                    }

                    }
                    
                  });

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
      console.log("Purchased successfully!"+"\n"+"\n"+"\n");
      printStats()
    })
  } 
