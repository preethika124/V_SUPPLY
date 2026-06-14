import { useState, useEffect }
from "react";

import {

 getCart,
 updateCartItem,
 removeFromCart,
 clearCart

}
from "../services/cartService";

import {

 placeOrder

}
from "../services/orderService";

import "../styles/cart.css";

function Cart(){

 const [items,
 setItems] =
 useState([]);

 useEffect(()=>{

  loadCart();

 },[]);

 const loadCart =
 async()=>{

  try{

   const token =
   localStorage.getItem(
    "token"
   );

   const response =
   await getCart(
    token
   );

   setItems(
    response.data
   );

  }
  catch(err){

   console.log(err);

  }

 };

const handleQuantity =
async(
 productId,
 quantity
)=>{

 if(quantity < 1){

  return;

 }

 try{

  const token =
  localStorage.getItem(
   "token"
  );

  await updateCartItem(

   productId,

   quantity,

   token

  );

  setItems(

   prev=>

   prev.map(item=>

    item.product_id ===
    productId

    ?

    {
     ...item,
     quantity
    }

    :

    item

   )

  );

 }
 catch(err){

  console.log(err);

 }

};
const handleRemove =
async(productId)=>{

 try{

  const token =
  localStorage.getItem(
   "token"
  );

  await removeFromCart(

   productId,

   token

  );

  setItems(

   prev=>

   prev.filter(
    item=>

    item.product_id !==
    productId
   )

  );

 }
 catch(err){

  console.log(err);

 }

};
 const handleCheckout =
 async()=>{

  try{

   const token =
   localStorage.getItem(
    "token"
   );

   await placeOrder(
    token
   );

   alert(
    "Order Placed"
   );

   loadCart();

  }
  catch(err){

   alert(

    err.response?.data
    ?.message ||

    "Checkout Failed"

   );

  }

 };

 const totalAmount =
 items.reduce(

  (sum,item)=>

   sum +

   (
    item.price *
    item.quantity
   ),

  0

 );

 return(

  <div
   className=
   "cart-page"
  >

   <div
    className=
    "cart-header"
   >

    <h1>

     My Cart

    </h1>

   </div>

   {

    items.length === 0 &&

    <div
     className=
     "empty-cart"
    >

     Cart Empty

    </div>

   }

   {

    items.map(
     item=>(

      <div
       key={
        item.product_id
       }
       className=
       "cart-card"
      >

       <img

        src={
         `http://localhost:5000${item.image_url}`
        }

        alt={
         item.product_name
        }

        className=
        "cart-image"

       />

       <div
        className=
        "cart-details"
       >

        <h3>

         {
          item.product_name
         }

        </h3>
        <p>

 Supplier :

 <strong>

  {
   item.company_name
  }

 </strong>

</p>

        <p>

         ₹
         {item.price}
         /
         {item.unit}

        </p>

        <p>

         MOQ :
         {
          item.minimum_order_quantity
         }
         {" "}
         {
          item.unit
         }

        </p>

        <div
         className=
         "qty-section"
        >

         <button

          onClick={()=>

           handleQuantity(

            item.product_id,

            item.quantity - 1

           )

          }

         >

          -

         </button>

         <span>

          {
           item.quantity
          }

         </span>

         <button

          onClick={()=>

           handleQuantity(

            item.product_id,

            item.quantity + 1

           )

          }

         >

          +

         </button>

        </div>

       </div>

       <div
        className=
        "cart-right"
       >

        <h3>

         ₹

         {

          item.price *

          item.quantity

         }

        </h3>

        <button

         className=
         "remove-btn"

         onClick={()=>

          handleRemove(
           item.product_id
          )

         }

        >

         Remove

        </button>

       </div>

      </div>

     )
    )

   }

   {

    items.length > 0 &&

    <div
     className=
     "checkout-box"
    >

     <h2>

      Total:
      ₹{totalAmount}

     </h2>

     <button

      className=
      "checkout-btn"

      onClick={
       handleCheckout
      }

     >

      Place Order

     </button>

    </div>

   }

  </div>

 );

}

export default Cart;