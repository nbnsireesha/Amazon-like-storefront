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
	//showItems();
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
	})
	placeOrder();
});
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
	        message: "How many units of the product they would like to buy?",
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
    			console.log("Please select a valid Item Id");
    			//function
    		}
    		else{
    			if(userQuantity <= data[0].stock_quantity){
    				console.log("your requested item is in stock");
    				connection.query(
    					"UPDATE products SET ? WHERE ? ",
    					[
    						{
    							stock_quantity: data[0].stock_quantity - userQuantity
    						},
    						{
    							item_id: userItem
    						}
    					],
    					function(err,data){
	    					if(err) throw err;
	    					console.log(" YOUR ORDER IS PLACED");
	    					console.log("YOUR TOTAL AMOUNT IS $" + container.price*userQuantity);
	    					connection.end();
    					}
    				);
    			}
    			else{
    				console.log("sorry, we are out of stock");
    			}
    		}

    	})
    });
}
