import React from "react";

import { API } from "../lib/API";

import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewPasswordPage = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  const params = useParams();
  const passwordToken = params.token;
  // console.log(params);

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
        email: "santrage02@naver.com",
        password: password,
        passwordToken: passwordToken,
      });

      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={(e) => changePasswordHandler(e)}
      >
        <input
          className="border-2 border-black bg-orange-300"
          type="password"
          placeholder="new password"
          ref={passwordRef}
        />
        <input
          className="border-2 border-black bg-orange-300"
          type="password"
          placeholder="confirm password"
          ref={passwordConfirmRef}
        />
        <button type="submit" className='text-sm" rounded bg-orange-200'>
          바꾸기
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
