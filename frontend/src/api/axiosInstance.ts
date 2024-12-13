import axios from "axios";

const client = axios.create({
  baseURL: "https://lema-assessment-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
