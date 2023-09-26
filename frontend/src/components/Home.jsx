import React, { useEffect, useContext } from "react";
import Items from "./Items";
import ItemContext from "../context/ItemContext";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import AllItems from "./AllItems";

const Notes = () => {
  const context = useContext(ItemContext);
  const { allItems, getAllItems } = context;
  const { type } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      getAllItems();
    }
    else{
      enqueueSnackbar("Login Required", {variant: "error"});
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
    <div className="container">
      <div className="row my-3">
        <h2>All Items - {type}</h2>
        <div className="container mx-2">
          {allItems.length === 0 && "There are no notes to display. Add a note"}
        </div>
        {localStorage.getItem("role") !== "Admin" ? allItems.map((item) => {
          return <Items key={item._id} item={item}/>;
        }) : (
          allItems.map((item) => {
            return <AllItems key={item._id} item={item}/>;
          })
        )}
      </div>
      </div> 
    </>
  );
}

export default Notes;
