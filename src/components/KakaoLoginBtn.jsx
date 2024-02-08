import React, { useState } from "react";
// images & icon
import kakaoBtn from "../assets/icons/kakaoBtn.svg";
// components
import Loading from "./UI/Loading";
const KakaoLoginBtn = ({ loading, handleLoading }) => {
  const restAPIKey = import.meta.env.VITE_REST_API_KEY;
  const redirectURL = import.meta.env.VITE_KAKAO_REDIRECT_URL;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restAPIKey}&redirect_uri=${redirectURL}&response_type=code`;
  function loginHandler() {
    handleLoading("kakao");
    const timer = setTimeout(() => {
      window.location.href = kakaoURL;
      handleLoading("kakao");
    }, 800);
    return () => clearTimeout(timer);
  }
  return (
    <button
      className="relative m-2"
      onClick={loginHandler}
      disabled={loading.isLoading}
    >
      <img src={kakaoBtn} alt="카카오로그인" className="w-11" />
      {loading.isLoading && loading.target === "kakao" && <Loading />}
    </button>
  );
};

export default KakaoLoginBtn;
