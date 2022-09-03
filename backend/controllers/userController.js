const asyncHandler = require ("express-async-handler")
const jwt = require ("jsonwebtoken") //to genrate a token
const bcrypt = require ("bcryptjs") // for encrypting password
const User = require ("../models/userModel") //database schema
const { request } = require("express")
const { use } = require("../routes/userRoutes") 


//@desc   POST Users
//@Path   POST /api/users
//@access Private
const registerUSer = asyncHandler(async (req,res)=>{

    const {name, email, password} = req.body  //destructing data send by user into variables

    //Check if feilds are incompelete
    if(!name || !email || !password){
        res.status(400)

        throw new Error ("Please add all field")
    }

    //Check if user already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)

        throw new Error("User already Exists")
    }

    //Convert password into Hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User in database
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        
        throw new Error("Invalid User Data")
    }
})

//@desc   Get User data
//@Path   GET /api/users/getMe
//@access Private

const getUser = asyncHandler(async (req,res)=> {

    res.status(200).json({message: "All Users Information"})
})

//@desc   authentication of the user
//@Path   POST /api/users/login
//@access Private

const loginUser = asyncHandler(async (req,res) =>{

    const {email, password} = req.body

    //Check user's email exist or not in db
    const user = await User.findOne({email}) //get one users data using emailid

    if(user && (await bcrypt.compare(password, user.password)) ){

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)

        throw new Error("Invalid Credentials")
    }
})
module.exports = {registerUSer,  getUser, loginUser}