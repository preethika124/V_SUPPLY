const Order =
require("../models/orderModel");

const OrderItem =
require("../models/orderItemModel");

const Product =
require("../models/productModel");



async function shipOrder(
    req,
    res
){

    try{

        const order =
        await Order
        .getOrderById(
            req.params.id
        );

        if(
            order.status !==
            "ACCEPTED"
        ){

            return res
            .status(400)
            .json({
                message:
                "Order must be accepted first"
            });

        }

        const updated =
        await Order
        .markShipped(
            order.id
        );

        res.json(
            updated
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}
async function deliverOrder(
    req,
    res
){

    try{

        const order =
        await Order
        .getOrderById(
            req.params.id
        );

        if(
            order.status !==
            "SHIPPED"
        ){

            return res
            .status(400)
            .json({
                message:
                "Order not shipped"
            });

        }

        const updated =
        await Order
        .markDelivered(
            order.id
        );

        res.json(
            updated
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}

async function placeOrder(
    req,
    res
){

    try{

        const Cart =
        require(
         "../models/cartModel"
        );

        const CartItem =
        require(
         "../models/cartItemModel"
        );

        const cart =
        await Cart
        .getCartByVendorId(
            req.vendor.id
        );

        if(!cart){

            return res
            .status(400)
            .json({
                message:
                "Cart empty"
            });

        }

        const items =
        await CartItem
        .getItems(
            cart.id
        );

        if(
            items.length === 0
        ){

            return res
            .status(400)
            .json({
                message:
                "Cart empty"
            });

        }
      
        let supplierId =
        null;

        let totalAmount =
        0;

        for(
            const item
            of items
        ){

            if(
                supplierId ===
                null
            ){

                supplierId =
                item.supplier_id;

            }

            if(
                supplierId !==
                item.supplier_id
            ){

                return res
                .status(400)
                .json({
                    message:
                    "Cart contains products from different suppliers"
                });

            }

            if(
                item.quantity <
                item.minimum_order_quantity
            ){

                return res
                .status(400)
                .json({
                    message:
                    `${item.name} MOQ not met`
                });

            }

            if(
                item.quantity >
                item.stock
            ){

                return res
                .status(400)
                .json({
                    message:
                    `${item.name} stock insufficient`
                });

            }

            totalAmount +=

            item.quantity *
            item.price;

        }

        const order =
        await Order
        .createOrder(
            req.vendor.id,
            supplierId,
            totalAmount
        );

        for(
            const item
            of items
        ){

            await OrderItem
            .createOrderItem(

                order.id,

                item.product_id,

                item.quantity,

                item.price,

                item.quantity *
                item.price

            );

        }

        await CartItem
        .clearCart(
            cart.id
        );

        res.status(201)
        .json(order);

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}
async function getOrderDetails(
    req,
    res
){

    try{

        const order =
        await Order
        .getOrderById(
            req.params.id
        );

        if(!order){

            return res
            .status(404)
            .json({
                message:
                "Order not found"
            });

        }

        const items =
        await OrderItem
        .getOrderItems(
            order.id
        );

        res.json({

            order,

            items

        });

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}
async function getMyOrders(
    req,
    res
){

    try{

        const orders =
        await Order
        .getVendorOrders(
            req.vendor.id
        );

        res.json(
            orders
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}


async function getSupplierOrders(
    req,
    res
){

    try{

        const orders =
        await Order
        .getSupplierOrders(
            req.supplier.id
        );

        res.json(
            orders
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}


async function acceptOrder(
    req,
    res
){

    try{

        const order =
        await Order
        .getOrderById(
            req.params.id
        );

        if(!order){

            return res
            .status(404)
            .json({
                message:
                "Order not found"
            });

        }

        if(
            order.supplier_id !==
            req.supplier.id
        ){

            return res
            .status(403)
            .json({
                message:
                "Unauthorized"
            });

        }

        if(
            order.status !==
            "PENDING"
        ){

            return res
            .status(400)
            .json({
                message:
                "Order already processed"
            });

        }

        const items =
        await OrderItem
        .getOrderItems(
            order.id
        );

        for(
            const item
            of items
        ){

            await Product
            .reduceStock(
                item.product_id,
                item.quantity
            );

        }

        const updated =
        await Order
        .updateStatus(
            order.id,
            "ACCEPTED"
        );

        res.json(
            updated
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}

/*
--------------------------------
REJECT ORDER
--------------------------------
*/
async function rejectOrder(
    req,
    res
){

    try{

        const order =
        await Order
        .getOrderById(
            req.params.id
        );

        if(!order){

            return res
            .status(404)
            .json({
                message:
                "Order not found"
            });

        }

        if(
            order.supplier_id !==
            req.supplier.id
        ){

            return res
            .status(403)
            .json({
                message:
                "Unauthorized"
            });

        }

        if(
            order.status !==
            "PENDING"
        ){

            return res
            .status(400)
            .json({
                message:
                "Order already processed"
            });

        }

        const updated =
        await Order
        .updateStatus(
            order.id,
            "REJECTED"
        );

        res.json(
            updated
        );

    }
    catch(err){

        res.status(500)
        .json({
            message:
            err.message
        });

    }

}

module.exports = {

    placeOrder,

    getMyOrders,

    getSupplierOrders,

    acceptOrder,

    rejectOrder,shipOrder,
deliverOrder,

    getOrderDetails

};