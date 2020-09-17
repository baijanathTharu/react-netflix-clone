import axios from "axios";

const axiosObj = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default axiosObj;
