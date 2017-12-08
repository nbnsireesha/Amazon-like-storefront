DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

-- to select the right database for the sql file in mysql workbench, add this:
use bamazon;

-- to create a table in a database 
CREATE TABLE products(
  item_id  INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

DROP TABLE products;

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (105,"rugs", "furniture", 380.89, 200),(106,"cocktail glasses", "kitchen", 30, 600 ), (107,"water bottle", "outdoor", 34.5, 901 ),(108,"computer", "electronics", 950, 70 );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (109,"rugs", "furniture", 380.89, 200),(110,"cocktail glasses", "kitchen", 30, 600 ), (111,"water bottle", "outdoor", 34.5, 901 ),(112,"computer", "electronics", 950, 70 );