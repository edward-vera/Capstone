let express = require("express");

let routes = express.Router();

let controller = require("../controllers/workoutController");

routes.get("/exercise", controller.getAllExercise);

routes.get("/exercise/:id", controller.getSingleExercise);

routes.delete("/exercise/:id", controller.deleteExercise);

routes.post("/exercise", controller.createExercise);

routes.put("/exercise/:id", controller.updateExercise);

module.exports = routes;