import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

import {
  registerVendor
} from "../services/authService";

function VendorRegister() {

  const navigate =
  useNavigate();

  const [form, setForm] =
  useState({

    name: "",

    email: "",

    password: "",

    shopName: "",

    phone: ""

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

      await registerVendor(
        form
      );

      alert(
        "Vendor Registered Successfully"
      );

      navigate(
        "/login"
      );

    }
    catch (err) {

      alert(

        err.response?.data?.message ||

        "Registration Failed"

      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Vendor Register
        </h2>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <input
            className="auth-input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

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

          <input
            className="auth-input"
            name="shopName"
            placeholder="Shop Name"
            value={form.shopName}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Register
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px"
          }}
        >

          Already have an account?

          {" "}

          <span
            style={{
              color: "#2563eb",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );

}

export default VendorRegister;