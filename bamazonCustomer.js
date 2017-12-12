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
	showItems();
});

function showItems(){

	var sql = "SELECT item_id, product_name, price FROM products";
	connection.query(sql, function(err,result){
		if(err){
			throw err;
		}
		var table = new Table({
			head: ['Item Id','Product Name', 'Price']
		})
		for (var i = 0; i < result.length; i++) {
			table.push(
				[result[i].item_id , result[i].product_name , result[i].price]
			);
		}
		console.log(table.toString());
		placeOrder();
	})
	

}

function placeOrder(){
	inquirer
    .prompt([
	    {
	        name: "itemId",
	        type: "input",
	        message: "What is the Id of the item that you would like to buy?"
	    },
	    {
	        name: "units",
	        type: "input",
	        message: "\n How many units of the product they would like to buy?",
	        validate: function(value){
	        	if(isNaN(value) === false){
	        		return true;
	        	}
	        	return false;
	        }
	    }
    ])
    .then(function(answer) {
    	var userItem = answer.itemId;
    	var userQuantity = answer.units;
    	var sql1 = "SELECT * FROM products WHERE ?";
    	connection.query(sql1,{item_id: userItem},function(err, data){
    		if(err) throw err;
    		var container = data[0];
    		if(data.length == 0){
    			console.log("--Please select a valid Item Id--");
    			showItems();
    		}
    		else{
    			if(userQuantity <= data[0].stock_quantity){
    				console.log("\n Your Requested Item is in Stock  "+"\n");
    				connection.query(
    					"UPDATE products SET ? WHERE ? ",
    					[
    						{
    							stock_quantity: data[0].stock_quantity - userQuantity,
    							product_sales: data[0].product_sales + data[0].price*userQuantity
    						},
    						{
    							item_id: userItem
    						}
    					],
    					function(err,data){
	    					if(err) throw err;
	    					console.log("  YOUR ORDER IS PLACED  \n");
	    					console.log("  YOUR TOTAL AMOUNT IS $" + container.price*userQuantity +"  \n");
	    					inquirer
    						.prompt([
	    						{
							        name: "confirm",
							        type: "confirm",
							        message: "Do you want to shop again?"
								}
	    					])
	    					//connection.end();
	    					.then(function(answer) {
	    						if(answer.confirm === true){

	    							showItems();
	    						}
	    						else{
	    							connection.end();
	    						}
	    					});
    					}
    				);
    			}
    			else{
    				console.log("\n--Sorry, We are out of Stock--");
    				showItems();
    			}
    		}

    	})
    });
}
