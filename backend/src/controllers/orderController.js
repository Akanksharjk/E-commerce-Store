import OrderModel from "../models/Order.model.js"

export const createOrder = async (req, res) => {
    try {
        let { items, totalAmount } = req.body

        if (!items || items.lenght === 0) {
            return res.status(400).json({
                message: 'No order items found'
            })
        }
        let order = await OrderModel.create({
            user: req.user.id,
            items,
            totalAmount
        })

        res.status(201).json({
            message: 'Order created succesfully',
            order
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to place order',
            error: error.message
        })
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({
            user: req.user.id
        }).populate('items.product')
        res.json(orders)
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch orders',
            error: error.message
        })
    }
}
