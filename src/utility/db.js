
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


connection.connect();


// this is async
connection.query("select now()" , function(err, rows){
    if(err){
        console.log("connection not successful,", err)
    }else{
        console.log("test query result,", rows)
    }

});

module.exports = connection;