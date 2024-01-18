import React, { useEffect, useRef } from "react";
// router
import { Link, useNavigate } from "react-router-dom";
// axios
import { API } from "../api/API";
// recoil
import { user } from "../lib/constants/userInfo";
import { useRecoilState } from "recoil";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
// Components
import KakaoLoginBtn from "../components/KakaoLoginBtn";
import NaverLoginBtn from "../components/NaverLoginBtn";
// cookies
// import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);

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
      console.log("중간-1");
      // refresh token 저장 : 브라우저 자동
      setUserInfo(() => ({
        isLogin: true,
        username: res.data.username,
        // email: userInput.email,
      }));
      navigate("/home");

      // 성공 시 메인 창으로 리다이렉트
      // navigate("/");
      console.log("로그인 성공");
    } catch (error) {
      // status에 따른 Error Handling
      const errorResponse = error.response;
      const statusCode = errorResponse.status;
      console.log(statusCode);
      switch (statusCode) {
        case 404:
          alert("해당 이메일로된 아이디가 없습니다");
          break;
        case 401:
          alert("비밀번호가 틀렸습니다.");
          break;
        case 400:
          alert("Bad request (요청 형식이 잘못됨)");
          break;
      }
    }
  };
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="flex h-4/5 w-full flex-col items-center justify-center">
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
        <div>
          <button className="mt-5 border-2 border-red-800">
            <Link to="/home/auth/reset">비밀번호 찾기</Link>
          </button>
        </div>
      </form>
      <div className="flex flex-row">
        <KakaoLoginBtn />
        <GoogleLoginBtn />
        <NaverLoginBtn />
      </div>
    </div>
  );
};

export default LoginPage;
