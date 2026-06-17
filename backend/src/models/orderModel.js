const db =
require("../config/db");
async function createOrder(
    vendorId,
    supplierId,
    totalAmount
) {

    const result =
    await db.query(
        `
        INSERT INTO orders
        (
            vendor_id,
            supplier_id,
            total_amount
        )
        VALUES
        (
            $1,$2,$3
        )
        RETURNING *
        `,
        [
            vendorId,
            supplierId,
            totalAmount
        ]
    );

    return result.rows[0];

}
async function getVendorOrders(
    vendorId
) {

    const result =
    await db.query(
        `
        SELECT

            o.*,

            s.company_name

        FROM orders o

        JOIN suppliers s
        ON o.supplier_id = s.id

        WHERE o.vendor_id = $1

        ORDER BY o.created_at DESC
        `,
        [vendorId]
    );

    return result.rows;

}

async function getSupplierOrders(
    supplierId
) {

    const result =
    await db.query(
        `
        SELECT

            o.*,

            u.name,

            v.shop_name,

            v.phone

        FROM orders o

        JOIN vendors v
        ON o.vendor_id = v.id

        JOIN users u
        ON v.user_id = u.id

        WHERE o.supplier_id = $1

        ORDER BY o.created_at DESC
        `,
        [supplierId]
    );

    return result.rows;

}


async function getOrderById(
    orderId
) {

    const result =
    await db.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1
        `,
        [orderId]
    );

    return result.rows[0];

}

async function updateStatus(
    orderId,
    status
) {

    const result =
    await db.query(
        `
        UPDATE orders
        SET status = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            status,
            orderId
        ]
    );

    return result.rows[0];

}
async function markShipped(
    orderId
){

    const result =
    await db.query(
        `
        UPDATE orders
        SET

            status='SHIPPED',

            shipped_at=
            CURRENT_TIMESTAMP

        WHERE id=$1

        RETURNING *
        `,
        [orderId]
    );

    return result.rows[0];

}
async function markDelivered(
    orderId
){

    const result =
    await db.query(
        `
        UPDATE orders
        SET

            status='DELIVERED',

            delivered_at=
            CURRENT_TIMESTAMP

        WHERE id=$1

        RETURNING *
        `,
        [orderId]
    );

    return result.rows[0];

}

module.exports = {

    createOrder,

    getVendorOrders,

    getSupplierOrders,

    getOrderById,

    updateStatus,markShipped,
markDelivered

};