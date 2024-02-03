import React, { useEffect, useRef, useState } from "react";
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

const LoginPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [loginMessage, setLoginMessage] = useState("");
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
      localStorage.setItem("accessToken", res.headers.get("Authorization"));
      setUserInfo(() => ({
        isLogin: true,
        username: res.data.username,
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
        case 401:
          setLoginMessage("아이디 혹은 비밀번호가 맞지 않습니다.");
          break;
        case 400:
          alert("Bad request (요청 형식이 잘못됨)");
          break;
      }
    }
  };

  return (
    <div className="relative top-[20%] flex h-[88%] w-full flex-col items-center">
      <form
        className="flex w-1/3 min-w-[485px] justify-between"
        onSubmit={(e) => loginHandler(e)}
      >
        {/* 왼쪽 */}
        <div className="grid w-3/5 grid-cols-[2fr_5fr] grid-rows-4">
          <label className="col flex items-center justify-start font-bold">
            이메일
          </label>
          <input type="text" ref={emailRef} placeholder="입력해주세요" />
          <label className="col flex items-center justify-start font-bold">
            비밀번호
          </label>
          <input type="password" ref={passwordRef} placeholder="입력해주세요" />
          <p className="col-span-2 flex items-center text-xs text-[#EB4315]">
            {loginMessage}
          </p>

          <Link
            to="/home/auth/signup"
            className="mt-5 border-2 border-red-800 underline underline-offset-2"
          >
            회원가입
          </Link>
          <Link
            to="/home/auth/reset"
            className="mt-5 border-2 border-red-800 underline underline-offset-2"
          >
            비밀번호 찾기
          </Link>
        </div>
        {/* 오른쪽 */}
        <div className="relative h-full w-1/5">
          <button
            type="submit"
            className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
          >
            로그인
          </button>
        </div>
      </form>
      <div className="mt-6 flex w-1/3 min-w-[485px] items-center justify-between">
        소셜 계정으로 로그인
        <div className="flex w-2/5 justify-between">
          <NaverLoginBtn />
          <KakaoLoginBtn />
          <GoogleLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
