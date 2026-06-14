const db =
require("../config/db");

async function addItem(

    cartId,

    productId,

    quantity

){

    const result =
    await db.query(
        `
        INSERT INTO cart_items
        (
            cart_id,
            product_id,
            quantity
        )
        VALUES
        (
            $1,$2,$3
        )
        RETURNING *
        `,
        [
            cartId,
            productId,
            quantity
        ]
    );

    return result.rows[0];

}

async function getItems(
 cartId
){

 const result =
 await db.query(
 `
 SELECT

  ci.*,

  p.id AS product_id,
   

  p.name AS product_name,

  p.price,

  p.image_url,

  p.unit,

  p.stock,

  p.minimum_order_quantity,
   p.supplier_id,

  s.company_name

 FROM cart_items ci

 JOIN products p
 ON ci.product_id = p.id

 JOIN suppliers s
 ON p.supplier_id = s.id

 WHERE ci.cart_id = $1
 `,
 [cartId]
 );

 return result.rows;

}

async function removeItem(
 cartId,
 productId
){

 await db.query(
 `
 DELETE FROM cart_items

 WHERE cart_id = $1

 AND product_id = $2
 `,
 [
  cartId,
  productId
 ]
 );

}

async function clearCart(
    cartId
){

    await db.query(
        `
        DELETE
        FROM cart_items
        WHERE cart_id = $1
        `,
        [cartId]
    );

}



async function findCartItem(
    cartId,
    productId
){

    const result =
    await db.query(
        `
        SELECT *
        FROM cart_items
        WHERE cart_id = $1
        AND product_id = $2
        `,
        [
            cartId,
            productId
        ]
    );

    return result.rows[0];

}

async function updateQuantity(
 itemId,
 quantity
){

 const result =
 await db.query(
 `
 UPDATE cart_items

 SET quantity = $1

 WHERE id = $2

 RETURNING *
 `,
 [
  quantity,
  itemId
 ]
 );

 return result.rows[0];

}
module.exports = {

    addItem,

    getItems,

    removeItem,

    clearCart,

    findCartItem,

    updateQuantity

};