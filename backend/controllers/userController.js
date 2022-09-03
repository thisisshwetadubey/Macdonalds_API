const asyncHandler = require ("express-async-handler")
const jwt = require ("jsonwebtoken") //to genrate a token
const bcrypt = require ("bcryptjs") // for encrypting password
const User = require ("../models/userModel") //database schema


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
        password: hashedPassword //password will be stored in hashed format
    })

    if(user){
        res.status(201).json({              //throwing user information from backend to frontend
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)   //returning by calling generateToken function by passing user's id
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

//Generate Json Web Token

const generateToken = (id) => {                                  //sign method takes objects that's why id is in {} 

    return jwt.sign({id}, process.env.JWT_SECRET, {             //generating JWT token using passed id from line no. 46 and secret key from .env file also expiry date object 
        expiresIn: "30d"
    })
}

module.exports = {registerUSer,  getUser, loginUser}