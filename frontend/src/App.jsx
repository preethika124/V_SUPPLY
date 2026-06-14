import Navbar
from "./components/Navbar";
import RoleRoute
from "./components/RoleRoute";
import ProtectedRoute
from "./components/ProtectedRoute";
import "./styles/navbar.css";
import PlaceOrder
from "./pages/PlaceOrder";
import Cart
from "./pages/Cart";
import MyOrders
from "./pages/MyOrders";

import SupplierOrders
from "./pages/SupplierOrders";

import CreateProduct
from "./pages/CreateProduct";

import MyProducts
from "./pages/MyProducts";


import ProductList
from "./pages/ProductList";
import Home
from "./pages/Home";

import VendorDashboard
from "./pages/VendorDashboard";

import SupplierDashboard
from "./pages/SupplierDashboard";
import Login
from "./pages/Login";

import VendorRegister
from "./pages/VendorRegister";

import SupplierRegister
from "./pages/SupplierRegister";

import AdminDashboard
from "./pages/AdminDashboard";

import {
 Routes,
 Route
}
from "react-router-dom";

function App(){

 return(

 <>
  <Navbar />

  <Routes>
    <Route
 path="/"
 element={<Home/>}
/>
<Route
 path="/cart"
 element={
  <RoleRoute
   role="VENDOR"
  >
   <Cart />
  </RoleRoute>
 }
/>

<Route
 path="/vendor-dashboard"
 element={
  <RoleRoute
   role="VENDOR"
  >
   <VendorDashboard/>
  </RoleRoute>
 }
/>




<Route
 path="/supplier-dashboard"
 element={
  <RoleRoute
   role="SUPPLIER"
  >
   <SupplierDashboard/>
  </RoleRoute>
 }
/>

   <Route
    path="/login"
    element={<Login />}
   />

   <Route
    path="/vendor-register"
    element={
     <VendorRegister />
    }
   />

   <Route
    path="/supplier-register"
    element={
     <SupplierRegister />
    }
   />

   <Route
    path="/admin"
    element={
     <ProtectedRoute>

      <AdminDashboard />

     </ProtectedRoute>
    }
   />
   <Route
 path="/place-order"
 element={
  <PlaceOrder/>
 }
/>

<Route
 path="/my-orders"
 element={
  <MyOrders/>
 }
/>

<Route
 path="/supplier-orders"
 element={
  <SupplierOrders/>
 }
/>

   <Route
 path="/create-product"
 element={
  <ProtectedRoute>
   <CreateProduct />
  </ProtectedRoute>
 }
/>

<Route
 path="/my-products"
 element={
  <ProtectedRoute>
   <MyProducts />
  </ProtectedRoute>
 }
/>

<Route
 path="/products"
 element={
  <ProductList />
 }
/>

  </Routes>
 </>

 );

}

export default App;