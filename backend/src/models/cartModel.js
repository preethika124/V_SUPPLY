const db =
require("../config/db");

async function getCartByVendorId(
    vendorId
){

    const result =
    await db.query(
        `
        SELECT *
        FROM carts
        WHERE vendor_id = $1
        `,
        [vendorId]
    );

    return result.rows[0];

}

async function createCart(
    vendorId
){

    const result =
    await db.query(
        `
        INSERT INTO carts
        (
            vendor_id
        )
        VALUES
        (
            $1
        )
        RETURNING *
        `,
        [vendorId]
    );

    return result.rows[0];

}
async function updateCartItem(

 vendorId,

 productId,

 quantity

){

 const result =
 await db.query(
 `
 UPDATE cart_items
 SET quantity=$1
 WHERE cart_id = (

  SELECT id
  FROM carts
  WHERE vendor_id=$2

 )
 AND product_id=$3

 RETURNING *
 `,
 [
  quantity,
  vendorId,
  productId
 ]
 );

 return result.rows[0];

}

module.exports = {

    getCartByVendorId,

    createCart,
    updateCartItem

};