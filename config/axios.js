import axios from "axios";

const Ax = axios.create({
  baseURL: process.env.API_HOST,
  timeout: 100000,
  headers: {
    Accept: "application/json",
    Authorization: ''
  }
});

export default Ax;
