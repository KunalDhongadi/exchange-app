// A middleware is an abstract component as well non redudant approach for routes that require the user to be logged in. 
// The route method will take in a function (this middleware function) and check if the user is logged in everytime the given route is called.


var jwt = require('jsonwebtoken');
const fetchuser = (req, res, next) => {
    const token =  req.header('auth-token');

    if(!token){
        res.status(401).send({success:false, error: "Token not found"});
    }
    try {
        const data = jwt.verify(token, "kunal");
        req.user = data.user;
        next();
    } catch (error) {
        req.user = null;
        if (!res.headersSent) {
            res.status(401).send({success:false, error: "Please authenticate using a valid token.", message: error});
        }    
    }
    

}

module.exports = fetchuser;