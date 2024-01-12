import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    // access_token 자리
  },
});
