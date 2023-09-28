import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from 'notistack';

function Navbar() {
  let location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
    const handleLogOut =() => {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("role");
     enqueueSnackbar("LogOut Successful", {variant: "success"});
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
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
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <Link
                  className="btn btn-dark mx-1"
                  role="button"
                >
                  {localStorage.getItem("role")}
                </Link>
            {!localStorage.getItem("auth-token") ? (
              <form className="d-flex">
                <Link
                  className={`btn btn-dark mx-1 ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className={`btn btn-dark mx-1 ${
                    location.pathname === "/signin" ? "active" : ""
                  }`}
                  to="/signin"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <Link className={`btn btn-dark mx-1`} to="/login" onClick={handleLogOut} role="button">
                  Log Out
                </Link>
                {localStorage.getItem("role") !== "Admin" && <Link
                  className={`btn btn-dark mx-1 ${
                    location.pathname === "/mycart" ? "active" : ""
                  }`}
                  role="button"
                  to="/mycart"
                >
                  My Cart
                </Link>}
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
