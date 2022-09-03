const asyncHandler = require ("express-async-handler")
const jwt = require ("jsonwebtoken")
const User = require ("../models/userModel")

const protect = asyncHandler( async (req, res, next) => {       // Token = Brearer sdf98sdf.09s8d0909s8dfsd.098sdf

    let token
    //check authorization token is present in header or not AND authorization token is starting with word "Bearer" of not
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1] //spilts the Brearer word and token using space and only take the index of [1] i.e Token

            //verifying the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //Get user from token

            req.user = await User.findById(decoded.id).select("-password")  //Taking id from decode variable using this finding the matched data (id) from database and storing into variable req.user but not password
            next()

        } catch (error) {

            console.log(error)
            res.status(401)

            throw new Error ("User not Authorized")
            
        } 
    }
        
        if(!token) {

            res.status(401)
            throw new Error ("Not authorized , No token")
        
    }

    


})

module.exports = {protect}

