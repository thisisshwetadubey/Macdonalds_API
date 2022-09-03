const asyncHandler = require ("express-async-handler")
const Order = require ("../models/orderModel")

//@desc   Get Oders
//@Path   GET /api/oders
//@access Private
const getOrders = asyncHandler( async(req,res) =>{
    const orders = await Order.find()
    res.status(200).json(orders)
})

//@desc   Create order
//@Path   POST /api/orders
//@access Private
const creatOrder = asyncHandler( async (req, res) => {

    
    if(!req.body.text){
        res.status(400) // 400 - bad request if there will be not anything written on body
        
        throw new Error("Please add a text field") //this error will be thrown in response with 400
    }

    const newOrder = await Order.create({
        text: req.body.text 
    })


    res.status(200).json(newOrder)
})

//@desc   Delete order
//@Path   DELETE /api/orders
//@access Private
const deleteOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)

    
    if(!order){
        res.status(400)//data not found bad request

        throw new Error ("Order not found") //this msg will be displayed in response 
    }

    const deletedOrder = await order.remove()
    res.status(200).json(deletedOrder)
})

//@desc   Update order
//@Path   UPDATE /api/orders
//@access Private
const updateOrder = asyncHandler( async (req, res) => {

    const order = await Order.findById(req.params.id)

    
    if(!order){
        res.status(400)//data not found

        throw new Error ("Order not found") //throw new error will travel into middleware where it will go into err and display the message in that form
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedOrder)
})

module.exports = { getOrders , creatOrder, deleteOrder, updateOrder}