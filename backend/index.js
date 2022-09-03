const express = require ("express")
const dotenv = require ("dotenv").config()
const colors = require ("colors")
const {errorHandler}= require ("./middleware/errorMiddleware")
const connectDB = require ("./config/db")

connectDB()
//creating a variable for port
const port = process.env.PORT || 8000



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//middleware
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/users', require('./routes/userRoutes'))



app.use(errorHandler)




//Initializing Port using colors
app.listen(port, () => console.log( `Server Connected on: ${port}`.bgBlue.underline )) 