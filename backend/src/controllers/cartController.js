const Cart =
require("../models/cartModel");

const CartItem =
require("../models/cartItemModel");

async function addToCart(
 req,
 res
){

 try{

  const {

   productId,

   quantity

  } = req.body;

  let cart =
  await Cart
  .getCartByVendorId(
   req.vendor.id
  );

  if(!cart){

   cart =
   await Cart
   .createCart(
    req.vendor.id
   );

  }

  const existingItem =
  await CartItem
  .findCartItem(
   cart.id,
   productId
  );

  let item;

  if(existingItem){

   item =
   await CartItem
   .updateQuantity(
    existingItem.id,
    quantity
   );

  }
  else{

   item =
   await CartItem
   .addItem(
    cart.id,
    productId,
    quantity
   );

  }

  res.status(201)
  .json(item);

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}

async function getCart(
 req,
 res
){

 try{

  const cart =
  await Cart
  .getCartByVendorId(
   req.vendor.id
  );

  if(!cart){

   return res.json([]);

  }

  const items =
  await CartItem
  .getItems(
   cart.id
  );

  res.json(
   items
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

async function updateCartItem(
 req,
 res
){

 try{

  const {
   quantity
  } = req.body;

  const updated =
  await Cart
  .updateCartItem(

   req.vendor.id,

   req.params.id,

   quantity

  );

  if(!updated){

   return res
   .status(404)
   .json({
    message:
    "Cart item not found"
   });

  }

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
async function removeFromCart(
 req,
 res
){

 try{

  const cart =
  await Cart
  .getCartByVendorId(
   req.vendor.id
  );

  await CartItem
  .removeItem(

   cart.id,

   req.params.id

  );

  res.json({

   message:
   "Removed"

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

 addToCart,

 getCart,

 updateCartItem,

 removeFromCart

};