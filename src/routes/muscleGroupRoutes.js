let express = require("express");

let routes = express.Router();

let controller = require("../controllers/muscleGroupController");

routes.get("/muscleGroup", controller.getAllMuscleGroup);

routes.get("/muscleGroup/:muscleID", controller.getSingleMuscleGroup);

routes.delete("/muscleGroup/:muscleID", controller.deleteMuscleGroup);

routes.post("/muscleGroup", controller.createMuscleGroup);

routes.put("/muscleGroup/:muscleID", controller.updateMuscleGroup);

module.exports = routes;