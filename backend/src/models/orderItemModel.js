const db =
require("../config/db");

async function createOrderItem(
    orderId,
    productId,
    quantity,
    unitPrice,
    lineTotal
) {

    const result =
    await db.query(
        `
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity,
            unit_price,
            line_total
        )
        VALUES
        (
            $1,$2,$3,$4,$5
        )
        RETURNING *
        `,
        [
            orderId,
            productId,
            quantity,
            unitPrice,
            lineTotal
        ]
    );

    return result.rows[0];

}

async function getOrderItems(
    orderId
) {

    const result =
    await db.query(
        `
        SELECT

            oi.*,

            p.name,

            p.unit,

            p.image_url

        FROM order_items oi

        JOIN products p
        ON oi.product_id = p.id

        WHERE oi.order_id = $1
        `,
        [orderId]
    );

    return result.rows;

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
module.exports = {

    createOrderItem,

    getOrderItems,getOrderDetails

};