import React, { useRef, useState } from "react";
// router
import { useNavigate } from "react-router-dom";
// axios
import { API } from "../api/API";

const RegisterPage = () => {
  const [usernameCheck, setUsernameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  // styles
  const buttonClasses =
    "relative right-3 h-[140%] rounded-lg border-[1px] border-solid border-black";

  // 회원가입
  const registerHandler = async (event) => {
    event.preventDefault();

    if (!usernameCheck) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    if (!emailCheck) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    const username = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // 이메일 validation
    const email_pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (email_pattern.test(email) === false) {
      alert("이메일 형식이 아닙니다.");
      setEmailCheck(false);
      return;
    }

    // 비번 같은지 확인 후
    if (password !== confirmPassword) {
      // 모달 창으로 경고??
      alert("비밀번호가 다릅니다.");
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

      // 성공 시 메인창으로 리다이렉트
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요");
    }
  };

  // username, email 중복 검사
  const checkHandler = async (item) => {
    let postUrl;
    let registerInput;
    if (item === "username") {
      if (userNameRef.current.value.trim().length === 0) {
        alert("닉네임을 입력해주세요");
        return;
      }

      postUrl = "/auth/verify/username";
      registerInput = { username: userNameRef.current.value };
    } else {
      postUrl = "/auth/verify/email";
      registerInput = { email: emailRef.current.value };
    }

    try {
      const res = await API.post(postUrl, registerInput);
      console.log(res);
      if (res.data.message === "Valid username") {
        setUsernameCheck(true);
      } else if (res.data.message === "Valid email") {
        setEmailCheck(true);
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert("사용할 수 없습니다.");
        return;
      }

      alert("다시 시도해주세요");
      console.log(error);
    }
  };

  return (
    <div className="relative top-[15%] flex h-4/5 w-full flex-col items-center">
      <form
        className="flex w-[45%] min-w-[485px] justify-between"
        onSubmit={(e) => registerHandler(e)}
      >
        {/* 왼쪽 */}
        <div className="grid w-5/6 grid-cols-[30fr_55fr_13fr] grid-rows-8 gap-y-2">
          <label className="col flex items-center justify-start font-bold">
            닉네임
          </label>
          <input type="text" ref={userNameRef} placeholder="입력해주세요" />

          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("username")}
          >
            중복 확인
          </button>
          <p className="col-span-3 flex items-center text-xs text-[#38C3FF]">
            사용가능한 닉네임입니다.
          </p>
          <label className="col flex items-center justify-start font-bold">
            이메일
          </label>
          <input type="text" ref={emailRef} placeholder="입력해주세요" />
          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("email")}
          >
            중복 확인
          </button>
          <p className="col-span-3 flex items-center text-xs text-[#EB4315]">
            이메일 형식이 올바르지 않습니다.
          </p>

          <label className="col flex items-center justify-start font-bold">
            비밀번호
          </label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="입력해주세요"
            className="col-span-2"
          />
          <label className="col flex items-center justify-start font-bold">
            비밀번호 확인
          </label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="입력해주세요"
            className="col-span-2"
          />
          <p className="col-span-3 text-[14px] text-[#00000040]">
            ※최소 8자 이상 ※최소 1개의 대문자 & 특수문자 & 숫자 사용
          </p>
        </div>
        {/* 오른쪽 */}
        <div className="relative h-full w-[13%]">
          <button className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]">
            회원가입
          </button>
        </div>
      </form>
      <div className="flex w-[45%] min-w-[485px] justify-between">
        <div className="aspect-square w-[20px] rounded-md border-4 border-solid border-[#EB4315]" />
        <p className="flex w-11/12 items-center">
          이용약관 및 개인정보 수집 및 이용에 모두 동의합니다.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
