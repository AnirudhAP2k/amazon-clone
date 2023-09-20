import React, { useEffect, useContext } from "react";
import Items from "./Items";
import ItemContext from "../context/ItemContext";
import { useParams } from "react-router-dom";

function Notes() {
  const context = useContext(ItemContext);
  const { allItems, getAllItems } = context;
  const { type } = useParams();

  useEffect(()=>{
    getAllItems();
    // eslint-disable-next-line
  }, [])
  return (
    <>
    <div className="container">
      <div className="row my-3">
        <h2>All Items - {type}</h2>
        <div className="container mx-2">
          {allItems.length === 0 && "There are no notes to display. Add a note"}
        </div>
        {allItems.map((item) => {
          return <Items key={item._id} item={item}/>;
        })}
      </div>
      </div> 
    </>
  );
}

export default Notes;
