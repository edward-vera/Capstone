let express = require("express");

let routes = express.Router();

let controller = require("../controllers/exerciseController");

routes.get("/exercise", controller.getAllExercise);

routes.get("/exercise/:exerciseId", controller.getSingleExercise);

routes.delete("/exercise/:exerciseId", controller.deleteExercise);

routes.post("/exercise", controller.createExercise);

routes.put("/exercise/:exerciseId", controller.updateExercise);

module.exports = routes;