import React, { useEffect, useContext } from "react";
import ItemContext from "../context/ItemContext";
import { useParams, Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Backbutton from "./Backbutton";

const MyCart = () => {
  const context = useContext(ItemContext);
  const { cartItems, myCart, deleteCartItem } = context;
  const { type } = useParams();

  useEffect(() => {
    myCart();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container">
        <Backbutton/>
        <div className="row my-3">
          <h2>All Items - {type}</h2>
          
            {cartItems.length === 0 ? (
            <div className="container mx-2">
              <strong>There are no items to display. Add any item to wishlist</strong>
              </div> ) : (
                cartItems.map((item) => {
                  return (
                    <div className="col-md-3 my-3" key={item._id}>
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
                            <Link to={`/item/${item.item}`}>
                              <BsInfoCircle
                                className="mx-1"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                fill="green"
                              />
                            </Link>
                            <MdDeleteOutline
                              className="mx-1"
                              style={{ cursor: "pointer", fontSize: "24px" }}
                              fill="red"
                              onClick={() => {
                                deleteCartItem(item._id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
        </div>
      </div>
    </>
  );
};

export default MyCart;
