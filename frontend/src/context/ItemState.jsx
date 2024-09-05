import ItemContext from "./ItemContext";
import axios from 'axios';
import React, {useState} from 'react';
import { useSnackbar } from "notistack";

const ItemState = (props) => {
    const host = 'https://amazon-clone-snowy-seven.vercel.app';
    const [allItems, setallItems] = useState([]);
    const [item, setItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);
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

    const updateItem = (id, title, description, price, category) => {
        const data ={
            title,
            description,
            price,
            category
        }
        axios
            .put(`${host}/updateitem/${id}`, data, {
                headers: {"auth-token" : localStorage.getItem("auth-token")}
            })
            .then((res)=>{
                console.log(res);
                enqueueSnackbar(res.data.msg, {variant: "success"});
                getAllItems();
            })
            .catch((error)=>{
                console.log(error);
                enqueueSnackbar(error.response.data.errors[0].msg, {variant: "error"})
            })
    }

    const deleteItem = (id) => {
        axios
            .delete(`${host}/deleteitem/${id}`, {
                headers:{"auth-token" : localStorage.getItem("auth-token")}
            })
            .then((res)=>{
                console.log(res)
                // enqueueSnackbar(res.data.msg, {variant: "success"})
                 getAllItems();
            })
            .catch((error)=>{
                console.log(error)
                enqueueSnackbar(error.response.data.error, {variant: "error"})
            })
    }

    const getItem = async (id) => {
        await axios 
            .get(`${host}/getitem/${id}`)
            .then((res)=>{
                setItem(res.data.items);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const addWishlist = async (id) => {
        await axios
            .post(`${host}/addwishlist/${id}`, null, {
                headers:{"auth-token" : localStorage.getItem("auth-token")}
            })
            .then(()=>{
                enqueueSnackbar("Item added to Wishlist Successfully", {variant: "success"})
            })
            .catch((error)=>{
                enqueueSnackbar(error.response.data.error, {variant: "error"})
                console.log(error);
            })
    }

    const myCart =  () => {
         axios
            .get(`${host}/getwishlist`, {
                headers: {"auth-token" : localStorage.getItem("auth-token")}
            })
            .then((res)=>{
                setCartItems(res.data.items);
                if(res.data.items.length === 0){
                    enqueueSnackbar(res.data.error, {variant: "error"})
                }  
            })
            .catch((error)=>{
                enqueueSnackbar(error.response.data.error, {variant: "error"})
                console.log(error)
            })
        }

    const deleteCartItem = (id) => {
        axios
            .delete(`${host}/wishlistdeleteitem/${id}`)
            .then((res)=>{
                enqueueSnackbar(res.data.msg, {variant: "success"})
                 myCart();
        })
            .catch((error)=>{
                console.log(error)
                enqueueSnackbar(error.response.data.error, {variant: "error"})
            })
    }
  return (
    <div>
      <ItemContext.Provider value={{item, allItems, cartItems, getAllItems, deleteItem, updateItem, getItem, addWishlist, myCart, deleteCartItem}}>
        {props.children}
      </ItemContext.Provider>
    </div>
  )
}

export default ItemState;
