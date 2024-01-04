import React, { useState, useRef } from "react";
// Components
import KakaoMap from "../components/KakaoMap";

const PlanningPage = () => {
  const [userInput, setUserInput] = useState(null);
  const input = useRef(null);

  const clickHandler = (e) => {
    e.preventDeafult();
    setUserInput(input.current.value);
  };
  return (
    <main className="relative flex h-dvh w-full items-center justify-between">
      {/* 유저 입력 컴포넌트 자리 (임시 코드)*/}

      <input ref={input} id="user-input" className="border-2 border-black" />
      <button type="submit" onClick={(e) => clickHandler(e)}>
        검색버튼
      </button>
      <KakaoMap userInput={userInput} />
    </main>
  );
};

export default PlanningPage;
