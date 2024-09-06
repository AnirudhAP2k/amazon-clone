import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState({
    role: "",
  });
  const handleRoleChange = (e) => {
    setSelectedRole({ role: e.target.value });
  };

  const { enqueueSnackbar } = useSnackbar();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: selectedRole.role,
    };
    e.preventDefault();
    if (credentials.cPassword === credentials.password) {
      axios
        .post(`${process.env.REACT_APP_HOST}/createuser`, data, {
          headers: "application/json",
        })
        .then((res) => {
          enqueueSnackbar("Sign Up Successful. Please Login", {
            variant: "success",
          });
          navigate("/login");
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.error, { variant: "error" });
          setCredentials({
            name: credentials.name,
            email: credentials.email,
            password: "",
            cPassword: "",
          });
          setSelectedRole({ role: selectedRole.role });
        });
    } else {
      enqueueSnackbar("Password Mismatch", { variant: "error" });
      setCredentials({
        name: credentials.name,
        email: credentials.email,
        password: "",
        cPassword: "",
      });
      setSelectedRole({ role: selectedRole.role });
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="container" style={{ marginTop: "50px" }}>
        SignUp
      </h1>
      <form className="container my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={onChange}
            value={credentials.name}
            placeholder='"Enter a valid Name"'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
            placeholder='"Enter a valid email i.e. xyz@abc.com"'
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            required
            placeholder='"Enter atleast 5 characters"'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cPassword"
            id="cPassword"
            onChange={onChange}
            value={credentials.cPassword}
            placeholder='"Confirm your password"'
          />
        </div>
        <div>
          <label className="m-2" htmlFor="roleDropdown">
            Role :{" "}
          </label>
          <select
            id="roleDropdown"
            value={selectedRole.role}
            onChange={handleRoleChange}
          >
            <option disabled value="">
              Select a role
            </option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary my-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
