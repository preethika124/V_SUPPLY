import { useState, useEffect } from "react";

import {
  getMyProducts,
  deleteProduct
} from "../services/productService";

import "../styles/MyProducts.css";

function MyProducts(){

  const [products,
  setProducts] =
  useState([]);

  useEffect(()=>{

    loadProducts();

  },[]);

  const loadProducts =
  async()=>{

    try{

      const token =
      localStorage.getItem(
        "token"
      );

      const response =
      await getMyProducts(
        token
      );

      setProducts(
        response.data
      );

    }
    catch(err){

      console.log(err);

    }

  };

  const handleDelete =
  async(id)=>{

    try{

      const token =
      localStorage.getItem(
        "token"
      );

      await deleteProduct(
        id,
        token
      );

      setProducts(

        products.filter(
          product=>

          product.id !== id

        )

      );

    }
    catch(err){

      console.log(err);

    }

  };

  return(

    <div className="my-products-page">

      <div className="my-products-header">

        <h1>
          My Products
        </h1>

      </div>

      <div className="my-products-grid">

        {

          products.map(
            product=>(

              <div
                key={product.id}
                className="my-product-card"
              >

                <img

                  className="my-product-image"

                  src={
                    `http://localhost:5000${product.image_url}`
                  }

                  alt={
                    product.name
                  }

                  onError={(e)=>{

                    e.target.src =
                    "https://via.placeholder.com/300x180";

                  }}

                />

                <div
                  className="my-product-content"
                >

                  <h3>

                    {product.name}

                  </h3>

                  <p>

                    Price :

                    <strong>

                      ₹{product.price}

                    </strong>

                  </p>

                  <p>

                    Stock :

                    <strong>

                      {product.stock}

                    </strong>

                  </p>

                  <p>

                    Min order Quantity :

                    <strong>

                      {
                        product.minimum_order_quantity
                      }

                    </strong>

                  </p>
                    <p>

                    Unit :

                    <strong>

                      Per {product.unit}

                    </strong>

                  </p>
                  

                  <button

                    className="my-delete-btn"

                    onClick={()=>

                      handleDelete(
                        product.id
                      )

                    }

                  >

                    Delete Product

                  </button>

                </div>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}

export default MyProducts;