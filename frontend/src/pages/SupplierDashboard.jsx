import { Link }
from "react-router-dom";

import "../styles/supplierDashboard.css";

function SupplierDashboard(){

 return(

  <div
   className=
   "dashboard-container"
  >

   <div
    className=
    "dashboard-header"
   >

    <h1>

     Supplier Dashboard

    </h1>

    <p>

     Manage products,
     orders and inventory

    </p>

   </div>

   

   <div
    className=
    "quick-actions"
   >

    <h2>

     Quick Actions

    </h2>

    <div
     className=
     "action-buttons"
    >

     <Link
      className=
      "action-btn"
      to="/create-product"
     >
      Add Product
     </Link>

     <Link
      className=
      "action-btn"
      to="/my-products"
     >
      Manage Products
     </Link>

     <Link
      className=
      "action-btn"
      to="/supplier-orders"
     >
      View Orders
     </Link>

    </div>

   </div>

  </div>

 );

}

export default SupplierDashboard;