const express = require ("express")
const {registerUSer,  getUser, loginUser} = require ("../controllers/userController")
const router = express.Router()
const {protect} = require ("../middleware/authMiddleware")

router.route('/').post(registerUSer)
router.route('/getme').get(protect, getUser) //Calling the protect middleware
router.route('/login').post(loginUser)



module.exports = router