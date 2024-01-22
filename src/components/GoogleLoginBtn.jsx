import React from "react";
// images & icon
import googleBtn from "../assets/icons/googleBtn.svg";

const GoogleLoginBtn = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENTID;
  const googleRedirectUrl = import.meta.env.VITE_GOOGLE_REDIRECTURL;

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;

  function loginHandler() {
    window.location.href = googleAuthUrl;
  }

  return (
    <button onClick={loginHandler} className="m-2">
      <img src={googleBtn} alt="구글로그인" className="w-11" />
    </button>
  );
};

export default GoogleLoginBtn;
