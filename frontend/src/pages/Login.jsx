import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

import {
  login
} from "../services/authService";

function Login() {

  const navigate =
  useNavigate();

  const [form, setForm] =
  useState({

    email: "",
    password: ""

  });

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

      const response =
      await login(form);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      alert(
        "Login Successful"
      );

    
if(
 response.data.role ===
 "ADMIN"
){

 navigate("/admin");

}
else if(
 response.data.role ===
 "SUPPLIER"
){

 navigate(
  "/supplier-dashboard"
 );

}
else if(
 response.data.role ===
 "VENDOR"
){

 navigate(
  "/vendor-dashboard"
 );

}
    }
    catch(err){

      alert(

        err.response?.data?.message ||

        "Login Failed"

      );

    }

  };

  return(

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">

          Welcome Back

        </h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            className="auth-input"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            className="auth-btn"
            type="submit"
          >

            Login

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;