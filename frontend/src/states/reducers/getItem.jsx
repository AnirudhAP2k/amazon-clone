import axios from "axios";

const getItem = (data) => {
  const { id } = data;
  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/book/getbook/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
};

export default getItem;
