import React from "react";
// images & icon
import naverBtn from "../assets/icons/naverBtn.png";

const NaverLoginBtn = () => {
  const clientId = import.meta.env.VITE_NAVER_CLIENTID;
  const secretKey = import.meta.env.VITE_NAVER_SECRETKEY;
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACKURL;

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&state=${secretKey}`;

  function loginHandler() {
    window.location.href = naverAuthUrl;
  }

  return (
    <button onClick={loginHandler} className="m-2">
      <img src={naverBtn} alt="네이버로그인" className="w-11" />
    </button>
  );
};

export default NaverLoginBtn;
