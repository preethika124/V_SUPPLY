import axios from "axios";

const BASE_URL =
"http://localhost:5000/api/admin";

export const getPendingSuppliers =
(token) => {

 return axios.get(
  `${BASE_URL}/suppliers/pending`,
  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }
 );

};

export const approveSupplier =
(
 supplierId,
 token
)=>{

 return axios.put(
  `${BASE_URL}/suppliers/${supplierId}/approve`,
  {},
  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }
 );

};

export const rejectSupplier =
(
 supplierId,
 token
)=>{

 return axios.put(
  `${BASE_URL}/suppliers/${supplierId}/reject`,
  {},
  {
   headers:{
    Authorization:
    `Bearer ${token}`
   }
  }
 );

};