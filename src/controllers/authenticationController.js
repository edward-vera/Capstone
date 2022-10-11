
let db = require("../utility/db");

let jwt = require("jsonwebtoken");

// helps with hashing user passwords, storing and checking
let argon = require("argon2");

/**
 * we expect in the body an object that contains the username and password and full name
 * {"username": "evera", "password" : "turkeylegs!", "fullName" : Edward Vera}
 * 
 */
let register = async function(req, res){

    let username = req.body.username;
    let password = req.body.password;
    let fullName = req.body.fullName;
    
    let password_hash;
    
    try{
        password_hash = await argon.hash(password);
    } catch(err) {
        console.log("Uh, Oh", err);
        res.sendStatus(500);// something went wrong when attempting to hash
        return;
    }

    let sql = "insert into userslogins (username, password_hash, fullName) values (?, ?, ?)";
    let params = [username, password_hash, fullName];

    db.query(sql, params, function(err, rows){
        if(err){
            console.log("Unable to register");
            if(err.code == "ER_DUP_ENTRY"){
                res.status(400).send("Username already exists");
            }else{
                console.log(err);
                res.sendStatus(500);
            }
        }else{
            res.sendStatus(202);
        }
    });    
    
}



let login = function(req, res){

    let username = req.body.username;
    let password = req.body.password;

    let sql = "select username, password_hash, id, fullName from userslogins where username = ?"

    // is the placeholder for whatever you want the ? to be!!!!!
    let params = [username];
    
    
    db.query(sql, params, async function(err, rows){
        if(err){
            console.log("Could not get password hash", err);
            res.sendStatus(500);
        } else {
            if(rows.length > 1){
                console.log("Returned too many rows for username", username);
                res.sendStatus(500);
            } else if (rows.length == 0){
                res.sendStatus(400);
            }else {
                let pwHash = rows[0].password_hash;
                let fullName = rows[0].fullName;
                let userId = rows[0].id;

                let pass = false;

                try{
                    pass = await argon.verify(pwHash, password);
                }catch(err){
                    console.log("Failed to verify password", err);
                }
            
            if(pass){
                // give them a token
                let token = {
                    "fullName" : fullName,
                    "userId" : userId
                };
                let signedToken = jwt.sign(token, process.env.JWT_SECRET);
                res.json(signedToken);
            }else{
                res.sendStatus(400);
            }
        }

        }
    });


};



module.exports = {register, login}