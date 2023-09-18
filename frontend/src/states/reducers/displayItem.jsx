import axios from "axios";

const displayItem = () => {

  useEffect(() => {
    axios
      .get("http://localhost:5555/getallitems")
      .then((res) => {
        return res.data;
      }, [])
      .catch((error) => {
        console.log(error);
      });
  }, []);
}

export default displayItem;