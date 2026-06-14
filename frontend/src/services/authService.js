import axios from "axios";

const BASE_URL =
"http://localhost:5000/api/auth";

export const registerVendor =
(data) => {

 return axios.post(
   `${BASE_URL}/register/vendor`,
   data
 );

};

export const registerSupplier =
(data) => {

 return axios.post(
   `${BASE_URL}/register/supplier`,
   data
 );

};

export const login =
(data) => {

 return axios.post(
   `${BASE_URL}/login`,
   data
 );

};