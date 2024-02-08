import React, { useEffect, useState } from "react";
// images & icon
import naverBtn from "../assets/icons/naverBtn.png";
// Components
import Loading from "./UI/Loading";
const NaverLoginBtn = ({ loading, handleLoading }) => {
  const clientId = import.meta.env.VITE_NAVER_CLIENTID;
  const secretKey = import.meta.env.VITE_NAVER_SECRETKEY;
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACKURL;

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&state=${secretKey}`;

  function loginHandler() {
    handleLoading("naver");

    const timer = setTimeout(() => {
      window.location.href = naverAuthUrl;
      handleLoading("naver");
    }, 800);
    return () => clearTimeout(timer);
  }

  return (
    <button
      onClick={loginHandler}
      className="relative m-2"
      disabled={loading.isLoading}
    >
      <img src={naverBtn} alt="네이버로그인" className="w-11" />
      {loading.isLoading && loading.target === "naver" && <Loading />}
    </button>
  );
};

export default NaverLoginBtn;
