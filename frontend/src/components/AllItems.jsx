import React, { useContext, useState } from "react";
import ItemContext from "../context/ItemContext";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const AllItems = ({ item }) => {
  const context = useContext(ItemContext);
  const { deleteItem, updateItem } = context;
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState(item);

  const onChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className="modal fade"
        id={`exampleModaledit-${item._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModaleditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Item
              </h1>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={items.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={items.description}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={items.price}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={items.category}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  item.title === items.title &&
                  item.description === items.description &&
                  // eslint-disable-next-line
                  item.price == items.price &&
                  item.category === items.category
                }
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  updateItem(
                    items._id,
                    items.title,
                    items.description,
                    items.price,
                    items.category
                  );
                }}
              >
                Update Item
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 my-3">
        <div className="card">
          <div className="card-body" style={{ cursor: "pointer" }}>
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text">
              <strong>Rs. {item.price}</strong>
            </p>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
              style={{ left: "50%" }}
            >
              {item.category}
            </span>
            <div className="container">
              <Link to={`/item/${item._id}`}>
                <BsInfoCircle
                  className="mx-1"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  fill="green"
                />
              </Link>
              <AiOutlineEdit
                className="mx-1"
                style={{ cursor: "pointer", fontSize: "24px" }}
                fill="blue"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModaledit-${item._id}`}
              />
              <MdOutlineDelete
                className="mx-1"
                style={{ cursor: "pointer", fontSize: "24px" }}
                fill="red"
                onClick={() => {
                  deleteItem(item._id);
                  enqueueSnackbar("Item Deleted Successfully", {
                    variant: "success",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllItems;
