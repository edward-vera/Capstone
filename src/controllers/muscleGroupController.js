
// NOT USING THIS CONTROLLER AT THIS POINT BUT LEAVING IT IN JUST IN CASE


const { resume } = require("../utility/db");
let db = require("../utility/db");

/**
 * This function takes in a request and a response object
 * and returns a summary of all the todos items in the response
 * If the query failes for any reason, then return 500 status code
 */
let getAllMuscleGroup = function(req, res){
// what kind of query do we send
// to get all the items in the database
    let sql = "select muscleId, muscleName from muscleGroup"; 

    db.query(sql, function(err, rows){
        if(err){
            console.log("list muscleGroup query failed", err);
            res.sendStatus(500); //response back because it was our fault
        }else{
            res.json(rows);
        }
    });

};

/**
 * this function takes in a request and reponse object
 * and returns a single exercise item based on the id that is
 * a path parameter in the request
 * 
 * if the id is not a valid id, the response will be 'null'
 * otherwise, the entire exercise object will be returned in the response
 * 
 * /exercise/:workout
 */
 let getSingleMuscleGroup = function(req, res){
    // what kind of query do we send
    // to get one the items in the database
    
            // this is bad, you should not do this...
            let muscleId = req.params.muscleId; // because the id is a path param
    
            // if id is falsey (null, undefined, '')
            if(!muscleId){
                res.sendStatus(404);
                return;
            }
    
            let sql = "select muscleId, muscleName from muscleGroup where muscleId = ?";
            let params = [muscleId];
    
            db.query(sql, params, function(err, rows){
                if(err){
                console.log("failed to get an item from the db", err);
                res.sendStatus(500);
            } else { 
                if(rows.length > 1){
                    console.log("returned more than 1 row for muscleId", muscleId);
                    res.sendStatus(500);
                } else if (rows.length == 0){
                    res.json(null);
                } else {
    
                    // grab the first row
                    // and alter it before sending it on to the client
                    // we are replacing the done (0,1)  with (no, yes)
                    let row = rows[0];
                    if(row.done == 1){
                        row.done = 'yes';
                    }else{
                        row.done = 'no';
                    }                
                    res.json(row);
    
                }
            }
            
            });
    
    };

/**
 * this function takes in a request and responds by deleting it
 * the request should include a json object that includes
 * -- description
 * -- notes
 * we will delete an entry in the todos database, with the corresponding
 * id that was generated for it
 * 
 * if the item has already been deleted we will return "Item doesn't exist"
 */
 let deleteMuscleGroup = function(req, res){
    // what kind of query do we send
    // to get delete the items in the database
    
        let sql = "delete from muscleGroup where muscleId = ?";
        
        let muscleId = req.params.muscleId;
        let params = [muscleId];
    
        db.query(sql, params, function(err, rows){
            if(err){
                console.log("Nothing exists", err);
                res.sendStatus(400);
            }else{
                console.log("muscleId successfully deleted total rows =",  rows.affectedRows,"muscleId =", muscleId);
                res.json(rows);
            }
        });
    };


/**
 * this function accepts req and res
 * the req should include a json object that includes
 * -- workout
 * -- notes
 * we will create an entry in the todos database, with the corresponding
 * workout and notes, the id will be auto generated
 * and item will be marked as done
 * 
 * the response will include.......
 */
 let createMuscleGroup = function(req, res){
    // what kind of query do we send
    // to Post the items in the database
    
        // the comlumns in the table are the contract between express and the db
        let sql = "INSERT INTO muscleGroup (muscleName) VALUES (?)"
        let params = [
            req.body.muscleName, //this is the contrace with the client side, we expect in the body of the req
        ];
    
        db.query(sql, params, function(err, rows){
            if(err){
                console.log("Failed to create an item", err);
                res.sendStatus(500);
            }else{
                // if we return nothing
                // res.sendStatus(202)
    
                // if we return the id:
                // res.json(rows.insertID);
                
    
                console.log("Item created", rows)
                res.json(rows);
            }
        });
    
    
    };


/**
 * this function takes in requests and responses, and it will
 * update the exercise based on the id that is a path parameter
 *  
 */
 let updateMuscleGroup = function(req, res){
    // what kind of query do we send
    // to Put the items in the database
    
        // the comlumns in the table are the contract between express and the db
        let muscleId = req.params.muscleId;
        if(!muscleId){
            res.sendStatus(500);
            return;
        }

        let sql = "update muscleGroup set muscleName = ? where muscleId = ?";
        let params = [req.body.muscleName, muscleId]
        

        db.query(sql, params, function(err, rows){
            if(err){
                console.log("Updating the user wasn't succesful", err);
                res.sendStatus(500); //because the error is on our side
            }else{
                console.log("Player Updated", rows);
                res.sendStatus(200); // no data sent
            };
        });
    };

module.exports = {getAllMuscleGroup, getSingleMuscleGroup, deleteMuscleGroup, updateMuscleGroup, createMuscleGroup};