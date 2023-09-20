import React, { useEffect, useContext } from "react";
import Items from "./Items";
import ItemContext from "../context/ItemContext";

function Notes() {
  const context = useContext(ItemContext);
  const { item, allItems } = context;

  useEffect(()=>{
    allItems();
    // eslint-disable-next-line
  }, [])
  return (
    <>
    <div className="container">
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {item.length === 0 && "There are no notes to display. Add a note"}
        </div>
        {item.map((item) => {
          return <Items key={item._id} item={item}/>;
        })}
      </div>
      </div> 
    </>
  );
}

export default Notes;
