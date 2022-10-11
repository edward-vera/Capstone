

let express = require("express");

let routes = express.Router();

let authController = require("../controllers/authenticationController")

//unprotected register route
routes.post("/register", authController.register);

//unprotected login route
routes.post("/login", authController.login);


module.exports = routes;