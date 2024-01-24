import React, { useState } from "react";

import { API } from "../api/API";

import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/common/Header";

// 새로운 비밀번호 입력 후 바꾸기
const NewPasswordPage = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  const [passwordValidate, setPasswordValidate] = useState({
    confirmed: false,
    message: null,
  });

  // URL parmas로 전달되는 passwordToken
  const params = useParams();
  const passwordToken = params.token;
  console.log(params);
  console.log(passwordToken);

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    const password = passwordRef.current.value;
    const confirmPassword = passwordConfirmRef.current.value;

    if (password !== confirmPassword) {
      alert("비밀번호가 다릅니다.");
      return;
    }
    if (password === "") {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const res = await API.post("/auth/new-password", {
        password: password,
        passwordToken: passwordToken,
      });

      console.log(res);
      alert("비밀번호 변경에 성공했습니다. 다시 로그인 해주세요");
      navigate("/home");
    } catch (error) {
      // 404 : invalid token, 로그인 페이지로 리다이렉트
      if (error.response.status === 404) {
        alert("잘못된 접근입니다");
        navigate("/home");
      } else if (error.response.status === 400) {
        // 400 : bad request, 다시 시도
        alert("다시 시도해주세요");
      } else {
        alert("다시 시도해주세요");
        navigate("/");
      }
    }
  };

  // 비밀번호 형식 검사
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/;
  function validatePassword(password) {
    if (passwordRegex.test(password)) {
      // 형식이 올바를 때
      setPasswordValidate({
        confirmed: true,
        message: null,
      });
    } else {
      // 형식이 틀릴 때
      setPasswordValidate({
        confirmed: false,
        message: "비밀번호 기준에 맞게 다시 입력해주세요.",
      });
    }
  }

  const passwordGuide = passwordValidate.confirmed ? (
    <p className="flex items-center text-xs text-[#38C3FF]">
      {passwordValidate.message}
    </p>
  ) : (
    <p className="flex items-center text-xs text-[#EB4315]">
      {passwordValidate.message}
    </p>
  );

  return (
    <>
      <Header />
      <div className="relative top-[15%] flex h-4/5 w-full flex-col items-center">
        <form
          className="flex w-1/3 min-w-[485px] justify-between"
          onSubmit={(e) => changePasswordHandler(e)}
        >
          <div className="grid-rows- grid w-3/4 grid-cols-[2fr_5fr] grid-rows-3 gap-1">
            {/* 비밀번호 */}
            <label className="col flex items-center justify-start font-bold">
              새 비밀번호
            </label>
            <input
              type="password"
              placeholder="new password"
              ref={passwordRef}
              onBlur={(e) => validatePassword(e.target.value)}
            />
            {/* 새 비밀번호 */}
            <label className="col flex items-center justify-start font-bold">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="confirm password"
              ref={passwordConfirmRef}
            />
            {/* 문구 */}
            <div className="col-span-2 ">
              {passwordGuide}
              <p className="mt-1 text-[14px] text-[#00000040]">
                ※최소 8자 이상 ※최소 1개의 대문자 & 특수문자 & 숫자 사용
              </p>
            </div>
          </div>
          {/* 오른쪽(버튼) */}
          <div className="relative h-full w-1/5">
            <button
              type="submit"
              className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
            >
              변경
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPasswordPage;
