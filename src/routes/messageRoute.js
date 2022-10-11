let express = require("express")

let routes = express.Router();

let messageController = require("../controllers/messageController");

let auths = require("../middleware/auths");


// anybody can get to this one, you do not need to have a valid token
//GET /hello
routes.get("/hello", messageController.hello);


// only requests that have a valid token are allowed in
//GET /customHello
routes.get("/privateHello", auths.checkJWT, messageController.privateHello);



module.exports = routes;