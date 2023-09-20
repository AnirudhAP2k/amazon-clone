import React, { useEffect, useContext } from "react";
import ItemContext from "../context/ItemContext";
import Backbutton from "./Backbutton";
import { useParams } from "react-router-dom";

const ShowItem = () => {
  const { item, getItem } = useContext(ItemContext);
  const { id } = useParams();

  useEffect(() => {
    getItem(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
        <Backbutton/>
      <h1 className="container" style={{ margin: "20px" }}>
        Show Item
      </h1>
      <div
        className="d-flex justify-content-start border border-primary border-2 rounded-5 p-4"
        style={{ width: "50%" }}
      >
        <div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">Id : </span>
            <span>{item._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">Item : </span>
            <span>{item.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">
              Description :{" "}
            </span>
            <span>{item.description}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">Price : </span>
            <span>{item.price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">Category : </span>
            <span>{item.category}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">
              Created At :
            </span>
            <span>{new Date(item.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-secondary p-4">
              Last Update Time :
            </span>
            <span>{new Date(item.updatedAt).toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
