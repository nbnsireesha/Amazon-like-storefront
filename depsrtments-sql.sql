use bamazon;

-- to create a table in a database 
CREATE TABLE departments(
  department_id  INT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs  INTEGER NOT NULL,
  PRIMARY KEY (department_id)
);

SELECT * FROM departments;

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES (201, "furniture", 10000),(202,"kitchen",5000), (203, "outdoor",7000),(204, "electronics", 90000),(205, "games", 10000),(206, "food", 25000);

SELECT d.department_id, d.department_name, d.over_head_costs, sum(product_sales) as product_sales, sum(product_sales) - d.over_head_costs  as total_profit
FROM products p INNER JOIN departments d ON p.department_name = d.department_name 
GROUP BY department_name  ;