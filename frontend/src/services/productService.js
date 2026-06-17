import axios from "axios";

const BASE_URL =
"http://localhost:5000/api/products";


export const createProduct =
(formData, token) => {

 return axios.post(
  BASE_URL,
  formData,
  {
   headers:{

    Authorization:
    `Bearer ${token}`

   }
  }
 );

};
export const updateProduct = (
  id,
  formData,
  token
) => {

  return axios.put(

    `${BASE_URL}/${id}`,

    formData,

    {
      headers: {
        Authorization:
        `Bearer ${token}`
      }
    }

  );

};

export const semanticSearch =
(search)=>{

 return axios.get(

  `${BASE_URL}/semantic-search?search=${search}`

 );

};
export const generateDescription =
(data, token)=>{

 console.log(
  "TOKEN RECEIVED:",
  token
 );

 return axios.post(
  `${BASE_URL}/generate-description`,
  data,
  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }
 );

};

export const getMyProducts =
(token)=>{

 return axios.get(

  `${BASE_URL}/my-products`,

  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }

 );

};

export const deleteProduct =
(
 id,
 token
)=>{

 return axios.delete(

  `${BASE_URL}/${id}`,

  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }

 );

};

export const getAllProducts =
()=>{

 return axios.get(
  BASE_URL
 );

};

export const searchProducts =
(search)=>{

 return axios.get(

  `${BASE_URL}/search?search=${search}`

 );

};
