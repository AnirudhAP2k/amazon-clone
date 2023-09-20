import ItemContext from "./ItemContext";
import axios from 'axios';
import React, {useState} from 'react'

const ItemState = (props) => {
    const host = 'http://localhost:5555'
    const [item, setItem] = useState([]);

    const allItems = () => {
        axios 
            .get(`${host}/getallitems`)
            .then((res)=>{
                setItem(res.data.items);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

  return (
    <div>
      <ItemContext.Provider value={{item, allItems}}>
        {props.children}
      </ItemContext.Provider>
    </div>
  )
}

export default ItemState;
