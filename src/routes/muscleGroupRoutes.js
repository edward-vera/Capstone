
// NOT USING THIS ROUTES AT THIS POINT BUT LEAVING IT IN JUST IN CASE


let express = require("express");

let routes = express.Router();

let controller = require("../controllers/muscleGroupController");

routes.get("/muscleGroup", controller.getAllMuscleGroup);

routes.get("/muscleGroup/:muscleId", controller.getSingleMuscleGroup);

routes.delete("/muscleGroup/:muscleId", controller.deleteMuscleGroup);

routes.post("/muscleGroup", controller.createMuscleGroup);

routes.put("/muscleGroup/:muscleId", controller.updateMuscleGroup);

module.exports = routes;