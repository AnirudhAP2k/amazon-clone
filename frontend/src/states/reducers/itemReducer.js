import { addItem, deleteItem, displayItem, getItem, updateItem } from "../actionCreator";

const items = [];

const reducer = (state={ items }, action) => {
    if(action.type === "add"){
        return addItem(action.payload);
    }
    else if(action.type === "display"){
       return state = displayItem();
    }
    else if(action.type === "delete"){
        return deleteItem(action.payload);
    }
    else if(action.type === "update"){
        return state = updateItem(action.payload);
    }
    else if(action.type === "get"){
        return state = getItem(action.payload);
    }
    else{
        return state
    }
}

export default reducer;