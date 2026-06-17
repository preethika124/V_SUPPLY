import { useState, useEffect } from "react";

import {
 createProduct
}
from "../services/productService";

import {
 generateDescription
}
from "../services/productService";
import {
 getCategories
}
from "../services/categoryService";

import "../styles/createProduct.css";

function CreateProduct() {

 const [categories,
 setCategories] =
 useState([]);

 const [form,
 setForm] =
 useState({

  categoryId: "",

  name: "",

  description: "",

  price: "",

  stock: "",

  unit: "KG",

  minimumOrderQuantity: ""

 });

 const [image,
 setImage] =
 useState(null);

 useEffect(() => {

  loadCategories();

 }, []);
const handleGenerateDescription =
async()=>{

 try{

  const token =
  localStorage.getItem(
   "token"
  );

  const response =
  await generateDescription(

   {

    name: form.name,

    

    price: form.price,

    unit: form.unit

   },

   token

  );

  setForm({

   ...form,

   description:
   response.data.description

  });

 }
 catch(err){

  console.log(err);

 }

};

 const loadCategories =
 async () => {

  try{

   const response =
   await getCategories();

   setCategories(
    response.data
   );

  }
  catch(err){

   console.log(err);

  }

 };

 const handleChange =
 (e) => {

  setForm({

   ...form,

   [e.target.name]:
   e.target.value

  });

 };

 const handleSubmit =
 async (e) => {

  e.preventDefault();

  try {

   const token =
   localStorage.getItem(
    "token"
   );

   const formData =
   new FormData();

   Object.keys(form)
   .forEach((key) => {

    formData.append(
     key,
     form[key]
    );

   });

   if(image){

    formData.append(
     "image",
     image
    );

   }

   await createProduct(
    formData,
    token
   );

   alert(
    "Product Created"
   );

   setForm({

    categoryId: "",

    name: "",

    description: "",

    price: "",

    stock: "",

    unit: "KG",

    minimumOrderQuantity: ""

   });

   setImage(null);

  }
  catch(err){

   alert(

    err.response?.data?.message ||

    "Error Creating Product"

   );

  }

 };

 return(

  <div
   className="product-page"
  >

   <div
    className="product-card"
   >

    <h2
     className="product-title"
    >

     Add Product

    </h2>

    <form
     className="product-form"
     onSubmit={
      handleSubmit
     }
    >

     <select
      className=
      "product-input"

      name="categoryId"

      value={
       form.categoryId
      }

      onChange={
       handleChange
      }
     >

      <option value="">

       Select Category

      </option>

      {

       categories.map(
        category => (

         <option
          key={
           category.id
          }

          value={
           category.id
          }
         >

          {
           category.name
          }

         </option>

        )
       )

      }

     </select>

     <input
      className=
      "product-input"

      name="name"

      placeholder=
      "Product Name"

      value={
       form.name
      }

      onChange={
       handleChange
      }
     />

     <input
      className=
      "product-input"

      name="description"

      placeholder=
      "Description"

      value={
       form.description
      }

      onChange={
       handleChange
      }
     />
     <button
 type="button"
 onClick={
  handleGenerateDescription
 }
>
 Generate Description
</button>

     <input
      className=
      "product-input"

      type="number"

      name="price"

      placeholder=
      "Price"

      value={
       form.price
      }

      onChange={
       handleChange
      }
     />

     <input
      className=
      "product-input"

      type="number"

      name="stock"

      placeholder=
      "Stock"

      value={
       form.stock
      }

      onChange={
       handleChange
      }
     />

     <select
      className=
      "product-input"

      name="unit"

      value={
       form.unit
      }

      onChange={
       handleChange
      }
     >

      <option value="KG">
       KG
      </option>

      <option value="PIECE">
       PIECE
      </option>

      <option value="LITER">
       LITER
      </option>

     </select>

     <input
      className=
      "product-input"

      type="number"

      name=
      "minimumOrderQuantity"

      placeholder=
      "Minimum Order Quantity"

      value={
       form.minimumOrderQuantity
      }

      onChange={
       handleChange
      }
     />

     <input
      className=
      "product-input full-width"

      type="file"

      onChange={(e)=>

       setImage(
        e.target.files[0]
       )

      }
     />

     <button
      className=
      "create-btn"

      type="submit"
     >

      Create Product

     </button>

    </form>

   </div>

  </div>

 );

}

export default CreateProduct;