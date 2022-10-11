let hello = function(req,res){
    console.log("hello() in messages controller");
    res.send("Hello there");
};

let privateHello = function(req, res){
    
    let usersName = req.userInfo.fullName;

    console.log("privateHello() in message controller");
    res.send("Hello there, I can see you are logged in " + usersName);
};


module.exports = {
    hello, privateHello
};