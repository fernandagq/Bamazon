
var mysql = require("mysql");

var inquirer = require("inquirer");

var table = require("console.table")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)


inquirer
    .prompt([
        {
            name: "choice",
            type: "input",
            message: "Type the id of the product you would like to buy"
        },

        {
            name: "quantity",
            type: "input",
            message: "How many units of this product would you like to buy?"

        }
    ]).then(function (inquirerResponse) {

        connection.query("SELECT * FROM products", function (err, res) {
           var quantity= parseInt(inquirerResponse.quantity);
           
           var inputChoice= parseInt(inquirerResponse.choice);

           var stock = (res[(inputChoice - 1)].stock_quantity);

           var updatedStock=(stock-quantity);
           
            if (quantity>res[inputChoice-1].stock_quantity){
                    console.log("Our inventory does not match your request, please try again and make sure we have enough.");
                    start();
                } else {
                    console.log("Your order is being processed!")
                    console.log("Your grand total is: $" + quantity*res[inputChoice-1].price)
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: updatedStock
                        },
                    {
                            id:inquirerResponse.choice
                    }]
                    );
                    console.log("updated stock information: " + updatedStock  + " for id: " + inquirerResponse.choice)
                }
            

        })
    });

});
};

