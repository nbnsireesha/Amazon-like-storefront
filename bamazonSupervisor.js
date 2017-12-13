var mysql = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table2');

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
	      choices: ["View Product Sales by Department",
	      			 "Create New Department"
	      			]
	    })
	    .then(function(answer) {
	    	if(answer.menu == "View Product Sales by Department"){
	    		viewDeptDetails();
	    	}
	    	else if(answer.menu == "Create New Department"){
	    		createNewDept();
	    	}

	    });
}
function viewDeptDetails(){
	var sql = "SELECT d.department_id, d.department_name, d.over_head_costs, ifnull(sum(product_sales),0) as product_sales, ifnull(sum(product_sales),0) - d.over_head_costs  as total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY department_name ORDER BY d.department_id ";
	connection.query(sql,function(err, result){
		if(err) throw err;
		var table = new Table({
			head: ['Department Id','Department Name', 'over_head_costs', 'total_product_sales', 'total_profit']
		})
		for (var i = 0; i < result.length; i++) {
			table.push(
				[result[i].department_id , result[i].department_name , result[i].over_head_costs, result[i].product_sales , result[i].total_profit]
			);
		}
		console.log(table.toString());
		start();
	})
}
function createNewDept(){
	inquirer
    .prompt([
	    {
	        name: "deptId",
	        type: "input",
	        message: "\n What is the Id of the department that you would like to add?",
	        validate: function(value){
	        	if(isNaN(value) === false){
	        		return true;
	        	}
	        	return false;
	        }
	    },
	    {
	        name: "deptName",
	        type: "input",
	        message: "\n What is the Name of the department that you would like to add?"   
	    },
	    {
	        name: "initalCost",
	        type: "input",
	        message: "\n Please enter the over_head_costs of the department?",  
	        validate: function(value){
	        	if(isNaN(value) === false){
	        		return true;
	        	}
	        	return false;
	        } 
	    }
    ])
    .then(function(answer) {
    	connection.query(
    			"INSERT INTO departments SET ?",
	    		{
	    			department_id: answer.deptId,
	    			department_name: answer.deptName,
	    			over_head_costs : answer.initalCost
	    		},
    			function(err,results){
    				if(err) throw err;
    				console.log("\n department was added to the data base\n ");
    				start();
    			}
    	);
    });

}