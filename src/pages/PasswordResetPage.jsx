import React from "react";
import { useRef } from "react";

import { API } from "../lib/API";

// 비밀번호 바꾸는 메일 받기
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
      const isSend = res.data.isSend;
      if (isSend) {
        alert("이메일로 링크가 전송되었습니다.");
      } else {
        // 현재는 백엔드가 false를 반환하지 않는 코드임.
        // 전송 or 에러임
        alert("존재하지 않는 이메일입니다.");
      }

      console.log(res);
    } catch (error) {
      alert("다시 시도해주세요.");
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
