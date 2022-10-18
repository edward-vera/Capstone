// bring in express framework
let express = require("express");
require("dotenv").config();

// define port
let PORT = process.env.PORT || 8080;

// define host
let host = process.env.MYSQL_HOST;

// create app server object
let app = express();

// enable our app to parse json requests
// using body-parser middleware
app.use(express.json());
app.use(express.static("/public"));


// will capture all the todo routes
let workoutRoutes = require("./src/routes/workoutRoutes");
let messageRoutes = require("./src/routes/messageRoute");
let authenticationRoutes = require("./src/routes/authenticationRoute");
let muscleGroupRoutes = require("./src/routes/muscleGroupRoutes");
app.use(workoutRoutes);
app.use(messageRoutes);
app.use(authenticationRoutes);
app.use(muscleGroupRoutes);





// start our application server, and print out what 
// port its listening on
app.listen(PORT, function(){
    console.log("Application started on port", PORT);
});

// to test connection with server
app.use("/hello", function(req, res){
    res.send("Enjoy your workout!")
})

// to test connection with server
app.use("/", function(req, res){
    res.send("Looks like we made it!")
})