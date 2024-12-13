import axios from "axios";

// const baseUrl =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:3001"
//     : "https://lema-assessment-backend.onrender.com";
const client = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
