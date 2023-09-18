
export const addItem = (data) => {
    return (dispatch)=>{
        dispatch({
            type: "add",
            payload: data
        })
    }
}

export const updateItem = (data) => {
    return (dispatch)=>{
        dispatch({
            type: "update",
            payload: data
        })
    }
}

export const deleteItem = (data) => {
    return (dispatch)=>{
        dispatch({
            type: "delete",
            payload: data
        })
    }
}

export const displayItem = (data) => {
    return (dispatch)=>{
        dispatch({
            type: "display",
            payload: data
        })
    }
}

export const getItem = (data) => {
    return (dispatch)=>{
        dispatch({
            type: "get",
            payload: data
        })
    }
}