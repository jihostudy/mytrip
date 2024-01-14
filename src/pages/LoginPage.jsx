import React, { useRef } from "react";
// axios
import { API } from "../lib/API";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

import axios from "axios";

const LoginPage = () => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const cookie = new Cookies();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const loginHandler = async (event) => {
    event.preventDefault();
    // console.log(idRef.current.value);
    const userInput = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post(`${BASE_URL}+/auth/signup`, userInput).then((res) => {
        console.log(res);
        // access token 저장
        localStorage.setItem("accessToken", res.headers.get("Authoriztion"));
        // refresh token 저장
        cookie.set("refreshToken", res.cookie.get("refreshToken"), {
          path: "/",
          secure: true,
          sameSite: "none",
        });
      });
      // 성공 시 메인 창으로 리다이렉트
      navigate("/");
      console.log("로그인 성공");
    } catch (error) {
      // status에 따른 Error Handling
      const statusCode = error.response.status; // 400
      const statusText = error.response.statusText; // Bad Request
      console.log(`${statusCode} - ${statusText} - ${message}`);
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form className="flex flex-col" onSubmit={(e) => loginHandler(e)}>
        <label>ID</label>
        <input
          type="text"
          ref={idRef}
          className=" border-2 border-black bg-orange-300"
        />
        <label>Password</label>
        <input type="password" ref={passwordRef} className="bg-orange-300" />
        <br />
        <button type="submit" className="border-2 border-red-800">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
