import React, { useRef } from "react";
// router
import { useNavigate } from "react-router-dom";
// axios
import { API } from "../lib/API";
// cookies
// import { useCookies } from "react-cookie";

const restAPIKey = import.meta.env.VITE_REST_API_KEY;

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    const userInput = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await API.post("/auth/login", userInput);

      console.log(res);
      // access token 저장
      localStorage.setItem("accessToken", res.headers.get("Authorization"));
      // refresh token 저장

      // setCookie("refreshToken", res.cookies.get("refreshToken"), {
      //   path: "/",
      //   secure: true,
      //   sameSite: "none",
      // });

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

  // 소셜 로그인
  const kakaoLoginHandler = () => {
    const redirectURL = import.meta.env.VITE_KAKAO_REDIRECT_URL;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restAPIKey}&redirect_uri=${redirectURL}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <form className="flex flex-col" onSubmit={(e) => loginHandler(e)}>
        <label>email</label>
        <input
          type="text"
          ref={emailRef}
          className=" border-2 border-black bg-orange-300"
        />
        <label>Password</label>
        <input type="password" ref={passwordRef} className="bg-orange-300" />
        <br />
        <button type="submit" className="border-2 border-red-800">
          Login
        </button>
      </form>
      <div className="flex flex-row">
        <button
          className="m-2 border-2 border-black"
          onClick={(e) => kakaoLoginHandler(e)}
        >
          Kakao
        </button>
        <button className="m-2 border-2 border-black">Naver</button>
        <button className="m-2 border-2 border-black">Google</button>
      </div>
    </div>
  );
};

export default LoginPage;
