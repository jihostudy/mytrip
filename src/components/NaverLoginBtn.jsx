import React from "react";

const NaverLoginBtn = () => {
  const clientId = import.meta.env.VITE_NAVER_CLIENTID;
  const secretKey = import.meta.env.VITE_NAVER_SECRETKEY;
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACKURL;

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&state=${secretKey}`;

  function loginHandler() {
    window.location.href = naverAuthUrl;
  }

  return (
    <button onClick={loginHandler} className="m-2 border-2 border-red-800">
      네이버로그인
    </button>
  );
};

export default NaverLoginBtn;
