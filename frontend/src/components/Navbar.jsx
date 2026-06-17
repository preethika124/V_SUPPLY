import { Link } from "react-router-dom";

function Navbar() {

   

    const token =
localStorage.getItem(
    "token"
);

const role =
localStorage.getItem(
    "role"
);

let homeLink = "/";



    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "role"
        );

        window.location.href =
        "/";

    };

    return (

        <nav className="navbar">

            <div className="logo">

              <Link to={homeLink}>
 V SUPPLY
</Link>  

            </div>

            <div className="nav-links">

                {
                    !token &&
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/vendor-register">
                            Vendor Register
                        </Link>

                        <Link to="/supplier-register">
                            Supplier Register
                        </Link>
                    </>
                }
{
 token &&
 role === "VENDOR" &&
 <>
  <Link
   to="/vendor-dashboard"
  >
   Dashboard
  </Link>

  <Link
   to="/products"
  >
   Browse Products
  </Link>

  <Link
   to="/cart"
  >
   Cart
  </Link>

  <Link
   to="/my-orders"
  >
   Orders
  </Link>

 

  
 </>
}

                {
                    token &&
                    role === "SUPPLIER" &&
                    <>
                        <Link to="/supplier-dashboard">
                            Dashboard
                        </Link>

                        <Link to="/create-product">
                            Add Product
                        </Link>

                        <Link to="/my-products">
                            My Products
                        </Link>

                        <Link to="/supplier-orders">
                            Orders
                        </Link>

                        
                    </>
                }

                {
                    token &&
                    role === "ADMIN" &&
                    <>
                        
                    </>
                }

                {
                    token &&
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                }

            </div>

        </nav>

    );

}

export default Navbar;