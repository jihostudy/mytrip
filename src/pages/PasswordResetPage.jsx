import React from "react";
import { useRef } from "react";

import { API } from "../lib/API";

const PasswordResetPage = () => {
  const emailRef = useRef();

  const emailSendHandler = async (event) => {
    event.preventDefault();
    const email = { email: emailRef.current.value };
    console.log(email);
    // api 요청
    try {
      const res = await API.post("/auth/reset", email);
      // 응답 받고 isSend 가 true 일때
      // false 일때

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={(e) => emailSendHandler(e)}
      >
        <input
          className="border-2 border-black bg-orange-300"
          placeholder="email"
          ref={emailRef}
        />
        <button type="submit" className='text-sm" rounded bg-orange-200'>
          보내기
        </button>
      </form>
    </div>
  );
};

export default PasswordResetPage;

//
