// axios
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    // access_token 자리
    // Authorization: localStorage.getItem("accessToken"),
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});
