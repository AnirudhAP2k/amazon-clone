import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const addItem = (data) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  axios
    .post("http://localhost:5555/api/book/savebook", data)
    .then(() => {
      enqueueSnackbar("Item Added Successfully", { variant: "success" });
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    });
};

export default addItem;
