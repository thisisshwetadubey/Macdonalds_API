const express = require ("express")
const router = express.Router()
const {getOrders, creatOrder, deleteOrder, updateOrder} = require("../controllers/orderController")

router.route("/").get(getOrders).post(creatOrder)
router.route("/:id").put(updateOrder).delete(deleteOrder)


module.exports = router
