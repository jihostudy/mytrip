import React, { useEffect, useState } from "react";
// images & icon
import naverBtn from "../assets/icons/naverBtn.png";
// Components
import Loading from "./UI/Loading";
const NaverLoginBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const clientId = import.meta.env.VITE_NAVER_CLIENTID;
  const secretKey = import.meta.env.VITE_NAVER_SECRETKEY;
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACKURL;

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&state=${secretKey}`;

  function loginHandler() {
    setIsLoading(true);
    const timer = setTimeout(() => {
      window.location.href = naverAuthUrl;
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <button onClick={loginHandler} className="relative m-2">
      <img src={naverBtn} alt="네이버로그인" className="w-11" />
      {isLoading && <Loading />}
    </button>
  );
};

export default NaverLoginBtn;
