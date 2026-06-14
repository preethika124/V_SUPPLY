import { Link }
from "react-router-dom";

import "../styles/vendorDashboard.css";

function VendorDashboard(){

 return(

  <div className="vendor-page">

   <div className="vendor-hero">

    <h1>

     Vendor Dashboard

    </h1>

    <p>

     Manage purchases,
     orders and suppliers

    </p>

   </div>

  

   <div className="vendor-actions">

    <Link
     to="/products"
     className="vendor-btn"
    >
     Browse Products
    </Link>

    <Link
     to="/cart"
     className="vendor-btn"
    >
     View Cart
    </Link>

    <Link
     to="/my-orders"
     className="vendor-btn"
    >
     My Orders
    </Link>

   </div>

  </div>

 );

}

export default VendorDashboard;