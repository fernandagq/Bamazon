//requiring npm packages

var mysql = require("mysql");

var inquirer = require("inquirer");

var table = require("console.table")

//setting up connection to mysql server
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

//initializing "start" function --> selecting all products from database 
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
//prompt npm package is set up to ask/recieve commands through the terminal 

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
    ])
    //set up function to handle user input and requests, pass inquirerResponse as a parameter.
    .then(function (inquirerResponse) {

        connection.query("SELECT * FROM products", function (err, res) {
        //turns user input into integer using built in method parseInt
           var quantity= parseInt(inquirerResponse.quantity);
           
           var inputChoice= parseInt(inquirerResponse.choice);
            //updating stock based on user input. 
           var stock = (res[(inputChoice - 1)].stock_quantity);

           var updatedStock=(stock-quantity);
           //using if/else statements to create appropriate response to request for non-existant inventory 
            if (quantity>res[inputChoice-1].stock_quantity){
                    console.log("Our inventory does not match your request, please try again and make sure we have enough.");
                    //calling start function to reset questions
                    start();
                } else {
                    console.log("Your order is being processed!")
                    console.log("Your grand total is: $" + quantity*res[inputChoice-1].price)
                    //connecting to database to update inventory in products table.
                    //updating stock_quantity column and id column according to user input and predetermined variables. 
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: updatedStock
                        },
                    {
                            id:inquirerResponse.choice
                    }]
                    );
                    //provide feedback to let user understand updates were made. 
                    console.log("updated stock information: " + updatedStock  + " for id: " + inquirerResponse.choice)
                }
            

        })
    });

});
};

