# Amazon-like-storefront
<<<<<<< HEAD
=======

Challenge #1: Customer View
1.The app should then prompt users with two messages.
  --The first should ask them the ID of the product they would like to buy.
  --The second message should ask how many units of the product they would like to buy.
  
2.Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
  --If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
  
3.However, if your store does have enough of the product, you should fulfill the customer's order.

4.This means updating the SQL database to reflect the remaining quantity.

5.Once the update goes through, show the customer the total cost of their purchase.

Challenge #2: Manager View 

bamazonManager.js. Running this application will List a set of menu options:

                                              1.View Products for Sale
                                              2.View Low Inventory
                                              3.Add to Inventory
                                              4.Add New Product
                                              
1.If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

2.If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

3.If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

4.If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

Challenge #3: Supervisor View 

1.Modify the products table so that there's a product_sales column and modify the bamazonCustomer.js app so that this value is updated with each individual products total revenue from each sale.

2.Modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

3.Make sure your app still updates the inventory listed in the products column.

Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

                                              1.View Product Sales by Department
                                              2.Create New Department
1.When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. 
  with columns department_id, department_name, over_head_costs, product_sales , total_profit
2.Where total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit   should not be stored in any database.

>>>>>>> b697095bae631d84533ee890fafb9938a7227d16
