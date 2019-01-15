CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 450.99, 4);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("headphones", "electronics", 40.01, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop charger", "electronics", 45.50, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dunder Mifflin Sweatshirt", "apparel", 30.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("build-on brick mug", "household items", 10.57, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("curling iron", "hair", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("straightening iron ", "hair", 100.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cassette tape", "electronics", 1.50, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cassette player", "electronics", 2.00, 550);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("barrel", "misc", 200.99, 10);


