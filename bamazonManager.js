var mysql      = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bala',
  database : 'bamazon'
});

connection.connect(function(err){
	if(err){
		throw err;
	}
	start();
});

function start(){
	inquirer
	    .prompt({
	      name: "menu",
	      type: "rawlist",
	      message: "SELECT ONE AMONG THE FOLLOWING LIST",
	      choices: ["View Products for Sale",
	      			 "View Low Inventory",
	      			 "Add to Inventory",
	      			 "Add New Product"]
	    })
	    .then(function(answer) {
	    	if(answer.menu == "View Products for Sale"){

	    		showAllProducts();

	    	}
	    	else if(answer.menu == "View Low Inventory"){

	    		lowInventory();

	    	}
	    	else if(answer.menu == "Add to Inventory"){

	    		addInventory();

	    	}
	    	else if(answer.menu == "Add New Product"){

	    		addNewProduct();

	    	}

	    });
}
function showAllProducts(){
	var sql = "SELECT item_id, product_name, price, stock_quantity FROM products";
	connection.query(sql,function(err,result){

		if(err) throw err;

		var table = new Table({
			head: ['Item Id','Product Name', 'Price', 'Quantity']
		})
		for (var i = 0; i < result.length; i++) {
			table.push(
				[result[i].item_id , result[i].product_name , result[i].price, result[i].stock_quantity]
			);
		}
		console.log(table.toString());
		//connection.end();
		start();

	})
}
function lowInventory(){
	var sql = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5 ";
	connection.query(sql,function(err,result){

		if(err) throw err;

		var table = new Table({
			head: ['Item Id','Product Name', 'Quantity']
		})
		for (var i = 0; i < result.length; i++) {
			table.push(
				[result[i].item_id , result[i].product_name , result[i].stock_quantity]
			);
		}
		console.log(table.toString());
		//connection.end();
		start();
	})

}
function addInventory(){
	inquirer
		.prompt([
			{
				name: "itemId",
				type: "input",
				message: "\n What is the item Id you would like to ADD?",
				validate: function(value){
		        	if(isNaN(value) === false){
		        		return true;
		        	}
		        	return false;
		        }
			},
			{
				name: "quantity",
				type: "input",
				message: "\n How many items do you like to add?",
				validate: function(value){
		        	if(isNaN(value) === false){
		        		return true;
		        	}
		        	return false;
		        }
			}
		])
		.then(function(answer){
			var sql = "SELECT * FROM products WHERE ?";
			var item = answer.itemId;
			var addQuantity =answer.quantity;
			connection.query(sql,{item_id: item},function(err,results){

				if(err) throw err;
				if(results.length == 0){
					console.log("\n please select the correct item");
					addInventory();
				}
				else{
					var container = results[0];
					var updatedQty = container.stock_quantity + parseInt(addQuantity);
					connection.query(
						"UPDATE products SET ? WHERE ?",
						[
							{
								stock_quantity: updatedQty
							},
							{
								item_id: item
							}
						],
						function(err,results){

							if(err) throw err;
							else{
								console.log("\n stock for item Id "+" "+item +" is updated to" +" " +(container.stock_quantity+parseInt(addQuantity)));
								start();
							}
						}
					);
				}

			});

		});
}
function addNewProduct(){
	inquirer
	    .prompt([
	      {
		        name: "itemId",
		        type: "input",
		        message: "\n What is the item Id you would like to add?"
	      },
	      {
		        name: "productName",
		        type: "input",
		        message: "\n What is the Product Name you would like to add?"
	      },
	      {
		        name: "department",
		        type: "input",
		        message: "\n What department would you like to add the product in?"
	      },
	      {
		        name: "price",
		        type: "input",
		        message: " \n What is the Price of the product?",
		        validate: function(value) {
		          if (isNaN(value) === false) {
		            return true;
		          }
		          return false;
		        }
	      },
	      {
	      		name: "quantity",
		        type: "input",
		        message: " \n What is the Stock Quantity of the product?",
		        validate: function(value) {
		          if (isNaN(value) === false) {
		            return true;
		          }
		          return false;
		        }

	      }
    	])
    	.then(function(answer){
    				connection.query(
		    			"INSERT INTO products SET ?",
			    		{
			    			item_id: answer.itemId,
			    			product_name: answer.productName,
			    			department_name: answer.department,
			    			price: answer.price,
			    			stock_quantity: answer.quantity
			    		},
		    			function(err,results){
		    				if(err) throw err;
		    				console.log("\n product was added to the data base");
		    				start();
		    			}
    				);
    	});
}