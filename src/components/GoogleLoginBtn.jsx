import React, { useState } from "react";
// images & icon
import googleBtn from "../assets/icons/googleBtn.svg";
// components
import Loading from "./UI/Loading";
const GoogleLoginBtn = ({ loading, handleLoading }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENTID;
  const googleRedirectUrl = import.meta.env.VITE_GOOGLE_REDIRECTURL;

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;

  function loginHandler() {
    handleLoading("google");

    const timer = setTimeout(() => {
      window.location.href = googleAuthUrl;
      handleLoading("google");
    }, 800);
    return () => clearTimeout(timer);
  }

  return (
    <button
      onClick={loginHandler}
      className="relative m-2"
      disabled={loading.isLoading}
      ek
    >
      <img src={googleBtn} alt="구글로그인" className="w-11" />
      {loading.isLoading && loading.target === "google" && <Loading />}
    </button>
  );
};

export default GoogleLoginBtn;
