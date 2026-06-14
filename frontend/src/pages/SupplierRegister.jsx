import { useState }
from "react";
import { useNavigate }
from "react-router-dom";

import "../styles/auth.css";

import {
 registerSupplier
}
from "../services/authService";

function SupplierRegister() {
const navigate =
useNavigate();
 const [form,setForm] =
 useState({

  name:"",
  email:"",
  password:"",
  companyName:"",
  gstNumber:"",
  phone:""

 });

 const handleChange =
 (e)=>{

  setForm({

   ...form,

   [e.target.name]:
   e.target.value

  });

 };

 const handleSubmit =
async(e)=>{

 e.preventDefault();

 try{

   await registerSupplier(
     form
   );

   alert(
    "Registration Successful"
   );

   navigate(
    "/login"
   );

 }
 catch(err){

   alert(
    err.response?.data?.message
   );

 }

};
return(

<div className="auth-container">

 <div className="auth-card">

  <h2 className="auth-title">
   Supplier Register
  </h2>

  <form
   className="auth-form"
   onSubmit={handleSubmit}
  >

   <input
    className="auth-input"
    name="name"
    placeholder="Full Name"
    onChange={handleChange}
   />

   <input
    className="auth-input"
    name="email"
    placeholder="Email"
    onChange={handleChange}
   />

   <input
    className="auth-input"
    type="password"
    name="password"
    placeholder="Password"
    onChange={handleChange}
   />

   <input
    className="auth-input"
    name="companyName"
    placeholder="Company Name"
    onChange={handleChange}
   />

   <input
    className="auth-input"
    name="gstNumber"
    placeholder="GST Number"
    onChange={handleChange}
   />

   <input
    className="auth-input"
    name="phone"
    placeholder="Phone Number"
    onChange={handleChange}
   />

   <button
    className="auth-btn"
    type="submit"
   >
     Register
   </button>

  </form>

 </div>

</div>

);
 

}

export default SupplierRegister;