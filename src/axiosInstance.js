import axios from "axios";

// Decide base URL dynamically
const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:7000/api" // local backend
  : "https://voting-system-backend-3msh.onrender.com/api"; // Render backend

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
