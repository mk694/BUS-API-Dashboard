import Axios from "axios";

const URL = "http://localhost:8080/";

const token = localStorage.getItem("token");
console.log(token);

const axios = Axios.create({
  baseURL: URL,
  headers: { Authorization: "token" },
  timeout: 10000,
});

export default axios;
