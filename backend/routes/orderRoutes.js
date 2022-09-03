const express = require ("express")
const router = express.Router()
const {getOrders, creatOrder, deleteOrder, updateOrder} = require("../controllers/orderController")
const {protect} = require("../middleware/authMiddleware")


router.route("/").get(protect, getOrders).post(protect, creatOrder)
router.route("/:id").put(protect, updateOrder).delete(protect, deleteOrder)


module.exports = router
