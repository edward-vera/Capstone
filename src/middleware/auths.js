let jwt = require("jsonwebtoken");

let checkJWT = function(req, res, next){

    // read the token from the request header
    let headerValue = req.get("Authorization");
    let signedToken;
    if(headerValue){
        let parts = headerValue.split(" ");
        signedToken = parts[1];
    }

    if(!signedToken){
        console.log("Missing signed token");
        res.sendStatus(403);
        return;
    }

    
    try{
    // this will either throw an error
    // or return an unsigned token
        let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET);

        req.userInfo = unsigned;


        // the only way to get to this line, is if line23 does not throw error
    } catch(error){
        // the only way to get to this line,
        //  is if any code in the try block throws an error
        console.log("Failed to verify token", error);
        res.sendStatus(403);
        return;
    }

    // this means the toke was valid
    // bc if no token was passed the function would quit at line16
    // if the function was bad, the function would have quit at line30
    // if i get this far, that means the token is good
    next()


};

module.exports = {checkJWT};