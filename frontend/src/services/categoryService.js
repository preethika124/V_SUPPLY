import axios
from "axios";

const BASE_URL =
"http://localhost:5000/api/categories";

export const getCategories =
()=>{

 return axios.get(
  BASE_URL
 );

};