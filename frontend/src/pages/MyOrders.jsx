import { useEffect, useState }
from "react";

import {
 getMyOrders
}
from "../services/orderService";

import "../styles/MyOrders.css";

function MyOrders(){

 const [orders,
 setOrders] =
 useState([]);

 useEffect(()=>{

  loadOrders();

 },[]);

 const loadOrders =
 async()=>{

  try{

   const token =
   localStorage.getItem(
    "token"
   );

   const response =
   await getMyOrders(
    token
   );

   setOrders(
    response.data
   );

  }
  catch(err){

   console.log(err);

  }

 };

 const getStatusClass =
 (status)=>{

  if(
   status ===
   "ACCEPTED"
  ){
   return "accepted";
  }

  if(
   status ===
   "REJECTED"
  ){
   return "rejected";
  }

  return "pending";

 };

 return(

  <div
   className=
   "orders-page"
  >

   <div
    className=
    "orders-header"
   >

    <h1>

     My Orders

    </h1>

   </div>

   {

    orders.length === 0 &&

    <div
     className=
     "empty-orders"
    >

     No Orders Found

    </div>

   }

   {

    orders.map(
     order=>(

      <div
       key={order.id}
       className=
       "order-card"
      >

       <div
        className=
        "order-top"
       >

        <div>

         <h3>

          Order #

          {
           order.id
           .slice(0,8)
          }

         </h3>

         <p>

          Total Amount

         </p>

         <h2>

          ₹

          {
           order.total_amount
          }

         </h2>

        </div>

        <div>

         <span

          className={

           `status-badge ${getStatusClass(
            order.status
           )}`

          }

         >

          {
           order.status
          }

         </span>

        </div>

       </div>

       <div
        className=
        "order-bottom"
       >

       
        <div>

         <p>

          Ordered On

         </p>

         <strong>

          {
           new Date(
            order.created_at
           )
           .toLocaleDateString()
          }

         </strong>

        </div>

       </div>

      </div>

     )
    )

   }

  </div>

 );

}

export default MyOrders;