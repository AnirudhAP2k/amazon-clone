import ItemContext from "./ItemContext";
import axios from 'axios';
import React, {useState} from 'react'

const ItemState = (props) => {
    const host = 'http://localhost:5555'
    const [allItems, setallItems] = useState([]);
    const [item, setItem] = useState([]);

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
  return (
    <div>
      <ItemContext.Provider value={{item, allItems, getAllItems, deleteItem, getItem}}>
        {props.children}
      </ItemContext.Provider>
    </div>
  )
}

export default ItemState;
