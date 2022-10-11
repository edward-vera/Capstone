
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


connection.connect();


// query we want to execute to test the function
let sql ="select now()";

// callback function that handles the results of
// the test query
let callback = function(err, rows){
    if(err){
        // if error is truthy, that means we have an err object
        // which means the query was not executed successfully
        console.log("Could not establish a connection to the database", err);
    } else {
        // otherwise, since our err object is falsey,
        // that means our query executed successfully,
        // so we print out the results of the query
        console.log("Connection made, test query returned", rows);
    }
};

// execute the query, and handle the results
connection.query(sql, callback);

// this is async
connection.query("select now()"  , function(err, rows){
    if(err){
        console.log("connection not successful,", err)
    }else{
        console.log("test query result,", rows)
    }

});

// execute the query, and handle the results
connection.query(sql, callback);

module.exports = connection;