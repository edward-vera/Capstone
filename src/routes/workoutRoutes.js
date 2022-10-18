let express = require("express");

let routes = express.Router();

let controller = require("../controllers/workoutController");

routes.get("/exercise", controller.getAllExercise);

routes.get("/exercise/:exerciseID", controller.getSingleExercise);

routes.delete("/exercise/:exerciseID", controller.deleteExercise);

routes.post("/exercise", controller.createExercise);

routes.put("/exercise/:exerciseID", controller.updateExercise);

module.exports = routes;