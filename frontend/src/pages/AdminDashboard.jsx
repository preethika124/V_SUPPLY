import { useState } from "react";
import "../styles/adminDashboard.css";
import {

 getPendingSuppliers,

 approveSupplier,

 rejectSupplier

}

from "../services/adminService";


function AdminDashboard(){

 const [suppliers,
 setSuppliers] =
 useState([]);

 const token =
 localStorage.getItem(
  "token"
 );
  const loadSuppliers =
 async ()=>{

  try{

   const response =
   await getPendingSuppliers(
    token
   );

   setSuppliers(
    response.data
   );

  }
  catch(err){

   alert(
    "Unauthorized"
   );

  }

 };
  const handleApprove =
 async(id)=>{

  await approveSupplier(
   id,
   token
  );

  loadSuppliers();

 };
  const handleReject =
 async(id)=>{

  await rejectSupplier(
   id,
   token
  );

  loadSuppliers();

 };
  return (
  <div className="admin-container">

    <div className="admin-header">
      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <button
        className="load-btn"
        onClick={loadSuppliers}
      >
        Load Pending Suppliers
      </button>
    </div>

    <div className="suppliers-grid">

      {suppliers.map((supplier) => (

        <div
          key={supplier.id}
          className="supplier-card"
        >

          <h3 className="company-name">
            {supplier.company_name}
          </h3>

          <p className="gst">
            GST: {supplier.gst_number}
          </p>

          <div className="action-buttons">

            <button
              className="approve-btn"
              onClick={() =>
                handleApprove(supplier.id)
              }
            >
              Approve
            </button>

            <button
              className="reject-btn"
              onClick={() =>
                handleReject(supplier.id)
              }
            >
              Reject
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
);

}

export default AdminDashboard;