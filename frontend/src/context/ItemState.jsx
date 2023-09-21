import ItemContext from "./ItemContext";
import axios from 'axios';
import React, {useState} from 'react';
import { useSnackbar } from "notistack";

const ItemState = (props) => {
    const host = 'http://localhost:5555'
    const [allItems, setallItems] = useState([]);
    const [item, setItem] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const getAllItems = () => {
        axios 
            .get(`${host}/getallitems`)
            .then((res)=>{
                setallItems(res.data.items);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const deleteItem = (id) => {
        axios
            .delete(`${host}/deleteitem/${id}`)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const getItem = async (id) => {
        await axios 
            .get(`${host}/getitem/${id}`, {
                headers: 'application/json'
            })
            .then((res)=>{
                setItem(res.data.items);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const addWishlist = (id) => {
        axios
            .post(`${host}/addwishlist/${id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "auth-token": localStorage.getItem("auth-token")
                }
            })
            .then((res)=>{
                enqueueSnackbar("Item added to Wishlist Successfully", {variant: "success"})
            })
            .catch((error)=>{
                enqueueSnackbar(error.response.data.error, {variant: "error"})
                console.log(error);
            })
    }
  return (
    <div>
      <ItemContext.Provider value={{item, allItems, getAllItems, deleteItem, getItem, addWishlist}}>
        {props.children}
      </ItemContext.Provider>
    </div>
  )
}

export default ItemState;
