import React from "react";

import { useRef } from "react";
import { API } from "../lib/API";

import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { user } from "../lib/constants/userInfo";

const NewUserNamePage = () => {
  const userNameRef = useRef();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(user);

  // 전달받은 토큰
  const { state } = useLocation();
  const token = state.accessToken;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const username = userNameRef.current.value;

    localStorage.setItem("accessToken", token);

    // 첫 소셜 로그인일 때, username 등록 api
    try {
      const res = await API.post("", { username: username });

      // 성공하면 전역변수 변경 후 메인으로 Redirect
      if (res.status === 200) {
        setUserInfo(() => ({
          isLogin: true,
          username: username,
        }));

        navigate("/home");
      } else {
        localStorage.removeItem("accessToken");
        alert("다시 시도해주세요.");
      }
    } catch (error) {
      // 실패하면 로그인 불가능
      localStorage.removeItem("accessToken");
      console.log(error);
      alert("다시 시도해주세요.");
    }

    // 성공하면 토큰 저장, 전역변수에 username 저장

    // 에러핸들링 (중복 등...)

    // /home으로 이동
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="flex flex-col gap-4"
      >
        <input
          ref={userNameRef}
          type="text"
          className="bg-orange-300"
          placeholder="username"
        />
        <button type="submit" className="border-2 border-red-800">
          제출
        </button>
      </form>
    </div>
  );
};

export default NewUserNamePage;
