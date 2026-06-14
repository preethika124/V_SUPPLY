import axios from "axios";

const BASE_URL =
"http://localhost:5000/api/orders";

export const placeOrder = (token) => {
  return axios.post(
    BASE_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getMyOrders = (token) => {
  return axios.get(
    `${BASE_URL}/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getSupplierOrders = (token) => {
  return axios.get(
    `${BASE_URL}/supplier`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const acceptOrder = (id, token) => {
  return axios.put(
    `${BASE_URL}/${id}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const rejectOrder = (id, token) => {
  return axios.put(
    `${BASE_URL}/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
