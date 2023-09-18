import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const deleteItem = (data) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect = (() => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/deleteitem/${data}`)
      .then(() => {
        enqueueSnackbar("Book Deleted Successfully", {variant: 'success'})
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
}

export default deleteItem;