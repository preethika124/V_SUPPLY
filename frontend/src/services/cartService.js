import axios from "axios";

const BASE_URL =
"http://localhost:5000/api/cart";

export const getCart =
(token)=>{

 return axios.get(

  BASE_URL,

  {

   headers:{

    Authorization:
    `Bearer ${token}`

   }

  }

 );

};

export const addToCart =
(data,token)=>{

 return axios.post(

  BASE_URL,

  data,

  {

   headers:{

    Authorization:
    `Bearer ${token}`

   }

  }

 );

};

export const updateCartItem =
(productId,
 quantity,
 token)=>{

 return axios.put(

  `${BASE_URL}/${productId}`,

  {

   quantity

  },

  {

   headers:{

    Authorization:
    `Bearer ${token}`

   }

  }

 );

};

export const removeFromCart =
(productId,
 token)=>{

 return axios.delete(

  `${BASE_URL}/${productId}`,

  {

   headers:{

    Authorization:
    `Bearer ${token}`

   }

  }

 );

};

export const clearCart =
(token)=>{

 return axios.delete(

  `${BASE_URL}/clear`,

  {

   headers:{

    Authorization:
    `Bearer ${token}`

   }

  }

 );

};