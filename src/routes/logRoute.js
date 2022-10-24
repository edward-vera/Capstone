let express = require("express");

let routes = express.Router();

let controller = require("../controllers/logController");

routes.get("/journal", controller.getAllLog);

routes.get("/journal/:logId", controller.getSingleLog);

routes.delete("/journal/:logId", controller.deleteLog);

routes.post("/journal", controller.createLog);

routes.put("/journal/:logId", controller.updateLog);

module.exports = routes;