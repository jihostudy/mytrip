import React from "react";
import { useRef } from "react";

import { API } from "../api/API";

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
    <div className="relative top-[15%] flex h-4/5 w-full flex-col items-center">
      <form
        className="flex w-1/3 min-w-[485px] justify-between"
        onSubmit={(e) => emailSendHandler(e)}
      >
        <div className="grid-rows- grid w-3/5 grid-cols-[2fr_5fr] grid-rows-3">
          <label className="col flex items-center justify-start font-bold">
            이메일
          </label>
          <input placeholder="입력해주세요" ref={emailRef} />
          <p className="col-span-2 flex items-center text-sm text-gray-500">
            가입했던 메일을 입력해주세요
          </p>
        </div>
        {/* 오른쪽 */}
        <div className="relative h-full w-1/5">
          <button
            type="submit"
            className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
          >
            메일 전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetPage;

//
