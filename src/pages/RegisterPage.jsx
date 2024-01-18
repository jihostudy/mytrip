import React, { useRef } from "react";
// router
import { useNavigate } from "react-router-dom";
// axios
import { API } from "../api/API";
// cookies
import { Cookies } from "react-cookie";

const RegisterPage = () => {
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const cookie = new Cookies();

  const navigate = useNavigate();

  // styles
  const inputClasses = "border-2 border-black bg-orange-300 ";
  const buttonClasses = " rounded bg-orange-200 text-sm";

  // 회원가입
  const registerHandler = async (event) => {
    event.preventDefault();

    const username = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // 이메일 validation
    const email_pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (email_pattern.test(email) === false) {
      alert("이메일 형식이 아님");
      return;
    }

    // 비번 같은지 확인 후
    if (password !== confirmPassword) {
      // 모달 창으로 경고??
      alert("비번 같지 않음");
      return;
    }

    // 서버로 전송 + 에러 핸들링
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log(res);
      // access token 저장
      localStorage.setItem("accessToken", res.headers.get("Authorization"));
      // refresh token 저장
      // console.log(res.cookies.get("refreshToken"));
      // cookie.set("refreshToken", res.cookies.get("refreshToken"), {
      //   path: "/",
      //   secure: true,
      //   sameSite: "none",
      // });

      // 성공 시 메인창으로 리다이렉트
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요");
    }
  };

  // username, email 중복 검사
  const checkHandler = (item) => {
    let postUrl;
    if (item === "username") {
      postUrl = "/auth/verify/username";
    } else {
      postUrl = "/auth/verify/email";
    }

    try {
      const { isSame } = API.post(postUrl, registerInput);
      console.log(isSame);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-4/5 w-full items-center justify-center">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => registerHandler(e)}
      >
        <div className="flex gap-2">
          <input
            type="text"
            ref={userNameRef}
            className={inputClasses}
            placeholder="username"
          />
          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("username")}
          >
            중복 검사
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            ref={emailRef}
            className={inputClasses}
            placeholder="email"
          />
          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("email")}
          >
            중복 검사
          </button>
        </div>

        <input
          type="password"
          ref={passwordRef}
          className={inputClasses}
          placeholder="password"
        />
        <input
          type="password"
          ref={confirmPasswordRef}
          className={inputClasses}
          placeholder="confirm password"
        />
        <button className={buttonClasses}>회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
