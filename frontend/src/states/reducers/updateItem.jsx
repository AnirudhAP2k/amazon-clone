import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const updateItem = (data) => {
  const navigate = useNavigate();
  const { id } = data;
  const { enqueueSnackbar } = useSnackbar();

   const payload = {
    title,
    author,
    publishedAt
  } = data
  useEffect( () => {
    axios
      .put(`http://localhost:5555/api/book/updatebook/${id}`, payload)
      .then(()=>{
        enqueueSnackbar("Book Updated Successfully", {variant: 'success'})
        navigate('/');
      })
      .catch((error)=>{
        console.log(error);
        enqueueSnackbar(error.response.data.error, {variant: 'error'})
      })
  }, [])
}