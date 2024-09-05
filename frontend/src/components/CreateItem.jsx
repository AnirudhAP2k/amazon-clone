import React, { useState } from "react";
import axios from "axios";
import Backbutton from "./Backbutton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreatebook = () => {
    const data = {
      title,
      description,
      price,
      category,
    };
    axios
      .post("https://amazon-clone-f6c4.onrender.com/additem", data, {
        headers:{"auth-token" : localStorage.getItem("auth-token")}
      })
      .then(() => {
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(error.response.data.errors[0].msg, { variant: "error" });
      });
  };

  return (
    <div className="container">
      <Backbutton />
      <h1 className="mt-3">Add Item</h1>
      <div className="border border-primary border-2 rounded-5 p-4 w-50">
        <div className="w-100">
          <div className="my-4">
            <label className="text-secondary">Title</label>
            <input
              className="form-control border-primary"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-secondary">Description</label>
            <input
              className="form-control border-primary"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-secondary">Price</label>
            <input
              className="form-control border-primary"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-secondary">Category</label>
            <input
              className="form-control border-primary"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start">
        <button className="btn btn-primary btn-lg" onClick={handleCreatebook}>
          Save
        </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
