import React from "react";
import { Link, useLocation} from "react-router-dom";

function Navbar() {

  let location = useLocation();

//   const handleLogout =() => {
//     localStorage.removeItem("auth-token");
//    showAlert("LogOut Successful", "success");
//   }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/allitems">
            LocalStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/allitems' ? "active" : ""}`} aria-current="page" to="/allitems">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/allitems">All Categories</Link></li>
                    <li><Link className="dropdown-item" to="/clothes">Clothes</Link></li>
                    <li><Link className="dropdown-item" to="/business">Electronics</Link></li>
                    <li><Link className="dropdown-item" to="/entertainment">Smart Phones</Link></li>
                    <li><Link className="dropdown-item" to="/health">Footwear</Link></li>
                    <li><Link className="dropdown-item" to="/science">Sports</Link></li>
                    <li><Link className="dropdown-item" to="/technology">Homeware's</Link></li>
                  </ul>
              </li>
            </ul>
            {!localStorage.getItem('auth-token') ? 
            <form className="d-flex">
              <Link className={`btn btn-dark mx-1 ${location.pathname === '/login' ? "active" : ""}`} to="/login" role="button">Login</Link>
              <Link className={`btn btn-dark mx-1 ${location.pathname === '/signup' ? "active" : ""}`} to="/signup" role="button">SignUp</Link>
            </form>
             :  <form className="d-flex">
              <Link className={`btn btn-dark mx-1`}  to="/login" role="button">Log Out</Link> </form> }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;