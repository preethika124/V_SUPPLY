import { Link }
from "react-router-dom";

import "../styles/Home.css";

function Home(){

 return(

  <div className="hero">

   <div className="hero-content">

    <h1>

     V SUPPLY

    </h1>

    <p>

     Connect Vendors and
     Suppliers in one platform

    </p>

    <div className="hero-buttons">

     <Link
      to="/login"
      className="primary-btn"
     >
      Login
     </Link>

     <Link
      to="/vendor-register"
      className="secondary-btn"
     >
      Register Vendor
     </Link>

     <Link
      to="/supplier-register"
      className="secondary-btn"
     >
      Register Supplier
     </Link>

    </div>

   </div>

  </div>

 );

}

export default Home;