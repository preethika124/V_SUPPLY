import { useState, useEffect } from "react";

import {
  getMyProducts,
  deleteProduct,
  updateProduct
}
from "../services/productService";

import "../styles/MyProducts.css";

function MyProducts(){

  const [products,
  setProducts] =
  useState([]);

  useEffect(()=>{

    loadProducts();

  },[]);
  const [editingProduct,
setEditingProduct] =
useState(null);

const [editForm,
setEditForm] =
useState({

  name:"",
  description:"",
  price:"",
  stock:"",
  minimum_order_quantity:"",
  unit:"",
  image:null

});

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
  const handleUpdate =
async()=>{

 try{

  const token =
  localStorage.getItem(
   "token"
  );

  const formData =
  new FormData();

  formData.append(
   "name",
   editForm.name
  );

  formData.append(
   "description",
   editForm.description
  );

  formData.append(
   "price",
   editForm.price
  );

  formData.append(
   "stock",
   editForm.stock
  );

  formData.append(
   "minimumOrderQuantity",
   editForm.minimum_order_quantity
  );

  formData.append(
   "unit",
   editForm.unit
  );

  if(
   editForm.image
  ){

   formData.append(
    "image",
    editForm.image
   );

  }

  await updateProduct(

   editingProduct.id,

   formData,

   token

  );

  alert(
   "Product Updated"
  );

  setEditingProduct(
   null
  );

  loadProducts();

 }
catch(err){

  console.log("FULL ERROR:", err);

  console.log(
    "RESPONSE:",
    err.response
  );

  console.log(
    "DATA:",
    err.response?.data
  );

  alert(
    JSON.stringify(
      err.response?.data
    )
  );

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
          product => (

            <div
              key={product.id}
              className="my-product-card"
            >

              <img
                className="my-product-image"
                src={
                  `http://localhost:5000${product.image_url}`
                }
                alt={product.name}
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
 Description:
</p>

<p
 className="product-description"
>
 {
  product.description
 }
</p>

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

                <button
                  className="my-edit-btn"
                  onClick={()=>{

                    setEditingProduct(
                      product
                    );

                    setEditForm({

                      name:
                      product.name,

                      description:
                      product.description || "",

                      price:
                      product.price,

                      stock:
                      product.stock,

                      minimum_order_quantity:
                      product.minimum_order_quantity,

                      unit:
                      product.unit,

                      image:
                      null

                    });

                  }}
                >
                  Edit Product
                </button>

              </div>

            </div>

          )
        )
      }

    </div>

    {
      editingProduct &&

      <div
        className="edit-modal"
      >

        <div
          className="edit-box"
        >

          <h2>
            Update Product
          </h2>

          <input
            value={
              editForm.name
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                name:
                e.target.value

              })

            }
            placeholder="Name"
          />

          <textarea
            value={
              editForm.description
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                description:
                e.target.value

              })

            }
            placeholder="Description"
          />

          <input
            type="number"
            value={
              editForm.price
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                price:
                e.target.value

              })

            }
          />

          <input
            type="number"
            value={
              editForm.stock
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                stock:
                e.target.value

              })

            }
          />

          <input
            type="number"
            value={
              editForm.minimum_order_quantity
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                minimum_order_quantity:
                e.target.value

              })

            }
          />

          <input
            value={
              editForm.unit
            }
            onChange={(e)=>

              setEditForm({

                ...editForm,

                unit:
                e.target.value

              })

            }
          />

          <input
            type="file"
            onChange={(e)=>

              setEditForm({

                ...editForm,

                image:
                e.target.files[0]

              })

            }
          />

          <div
            className="edit-actions"
          >

            <button
              onClick={
                handleUpdate
              }
            >
              Save
            </button>

            <button
              onClick={()=>

                setEditingProduct(
                  null
                )

              }
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    }

  </div>

);

   

}

export default MyProducts;