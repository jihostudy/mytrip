import React from "react";

const KakaoLoginBtn = () => {
  const restAPIKey = import.meta.env.VITE_REST_API_KEY;
  const loginHandler = () => {
    const redirectURL = import.meta.env.VITE_KAKAO_REDIRECT_URL;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restAPIKey}&redirect_uri=${redirectURL}&response_type=code`;
    window.location.href = kakaoURL;
  };
  return (
    <button className="m-2 border-2 border-red-800" onClick={loginHandler}>
      카카오로그인
    </button>
  );
};

export default KakaoLoginBtn;
