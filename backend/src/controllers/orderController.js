const Order =
require("../models/orderModel");

const OrderItem =
require("../models/orderItemModel");

const Product =
require("../models/productModel");




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

        

        for(
            const item
            of items
        ){

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

        }

       

        const supplierGroups =
        {};

        for(
            const item
            of items
        ){

            if(
                !supplierGroups[
                    item.supplier_id
                ]
            ){

                supplierGroups[
                    item.supplier_id
                ] = [];

            }

            supplierGroups[
                item.supplier_id
            ].push(item);

        }

        

        const createdOrders =
        [];

        for(
            const supplierId
            in supplierGroups
        ){

            const supplierItems =
            supplierGroups[
                supplierId
            ];

            let totalAmount =
            0;

            for(
                const item
                of supplierItems
            ){

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
                of supplierItems
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

            createdOrders.push(
                order
            );

        }

       

        await CartItem
        .clearCart(
            cart.id
        );

        res
        .status(201)
        .json({

            message:
            "Orders placed successfully",

            orders:
            createdOrders

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

 const client =
 await db.connect();

 try{

  await client.query(
   "BEGIN"
  );

  const orderResult =
  await client.query(
  `
  SELECT *
  FROM orders
  WHERE id = $1
  FOR UPDATE
  `,
  [
   req.params.id
  ]
  );

  const order =
  orderResult.rows[0];

  if(!order){

   await client.query(
    "ROLLBACK"
   );

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

   await client.query(
    "ROLLBACK"
   );

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

   await client.query(
    "ROLLBACK"
   );

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

   const productResult =
   await client.query(
   `
   SELECT *
   FROM products
   WHERE id = $1
   FOR UPDATE
   `,
   [
    item.product_id
   ]
   );

   const product =
   productResult.rows[0];

   if(!product){

    throw new Error(
     "Product not found"
    );

   }

   if(
    product.stock <
    item.quantity
   ){

    throw new Error(
     `${product.name} stock insufficient`
    );

   }

   await client.query(
   `
   UPDATE products
   SET stock =
   stock - $1
   WHERE id = $2
   `,
   [
    item.quantity,
    item.product_id
   ]
   );

  }

  const updatedResult =
  await client.query(
  `
  UPDATE orders
  SET status = 'ACCEPTED'
  WHERE id = $1
  RETURNING *
  `,
  [
   order.id
  ]
  );

  await client.query(
   "COMMIT"
  );

  res.json(
   updatedResult.rows[0]
  );

 }
 catch(err){

  await client.query(
   "ROLLBACK"
  );

  res.status(500)
  .json({
   message:
   err.message
  });

 }
 finally{

  client.release();

 }

}



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

    rejectOrder,
    getOrderDetails

};