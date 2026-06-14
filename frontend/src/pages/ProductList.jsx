import { useState, useEffect }
from "react";

import {

 getAllProducts,
 searchProducts

}
from "../services/productService";

import {

 addToCart,
 removeFromCart,
 getCart

}
from "../services/cartService";

import "../styles/products.css";

function Products(){

 const [products,
 setProducts] =
 useState([]);

 const [search,
 setSearch] =
 useState("");

 const [cartItems,
 setCartItems] =
 useState([]);

 useEffect(()=>{

  loadProducts();

  loadCart();

 },[]);

 const loadProducts =
 async()=>{

  const response =
  await getAllProducts();

  setProducts(
   response.data
  );

 };

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

   setCartItems(
    response.data
   );

  }
  catch(err){

   console.log(err);

  }

 };

 const handleSearch =
 async()=>{

  const response =
  await searchProducts(
   search
  );

  setProducts(
   response.data
  );

 };

 const isInCart =
 (productId)=>{

  return cartItems.some(
   item=>

   item.product_id ===
   productId

  );

 };

 const handleAdd =
 async(product)=>{

  const token =
  localStorage.getItem(
   "token"
  );

  await addToCart({

   productId:
   product.id,

   quantity:
   product.minimum_order_quantity

  },token);

  loadCart();

 };

 const handleRemove =
 async(productId)=>{

  const token =
  localStorage.getItem(
   "token"
  );

  await removeFromCart(
   productId,
   token
  );

  loadCart();

 };

 return(

  <div
   className=
   "market-page"
  >

   <div
    className=
    "market-header"
   >

    <h1>

     Marketplace

    </h1>

    <div
     className=
     "search-bar"
    >

     <input

      value={search}

      placeholder=
      "Search products..."

      onChange={(e)=>

       setSearch(
        e.target.value
       )

      }

     />

     <button
      onClick={
       handleSearch
      }
     >

      Search

     </button>

     <button
      onClick={
       loadProducts
      }
     >

      Reset

     </button>

    </div>

   </div>

   <div
    className=
    "market-grid"
   >

    {

     products.map(
      product=>(

       <div
        key={product.id}
        className=
        "market-card"
       >

        <img

         src={
          `http://localhost:5000${product.image_url}`
         }

         alt={
          product.name
         }

        />

        <div
         className=
         "market-content"
        >

         <h3>

          {product.name}

         </h3>

         <p>

          Supplier:
          {" "}
          {
           product.company_name
          }

         </p>

         <p>

          ₹
          {product.price}
          /
          {product.unit}

         </p>

         <p>

          Stock:
          {" "}
          {product.stock}
          {" "}
          {product.unit}

         </p>

         <p>

          MOQ:
          {" "}
          {
           product.minimum_order_quantity
          }
          {" "}
          {product.unit}

         </p>

         {

          isInCart(
           product.id
          )

          ?

          <button
           className=
           "remove-btn"

           onClick={()=>

            handleRemove(
             product.id
            )

           }
          >

           Remove Cart

          </button>

          :

          <button
           className=
           "add-btn"

           onClick={()=>

            handleAdd(
             product
            )

           }
          >

           Add To Cart

          </button>

         }

        </div>

       </div>

      )
     )

    }

   </div>

  </div>

 );

}

export default Products;