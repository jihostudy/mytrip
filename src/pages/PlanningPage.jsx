import React, { useState, useRef, useEffect } from "react";
// Components
import KakaoMap from "../components/KakaoMap";

const PlanningPage = () => {
  const [userInput, setUserInput] = useState(null);
  const input = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setUserInput(input.current.value);
  };

  useEffect(() => {
    console.log("changed");
  }, [userInput]);
  return (
    <main className="relative flex h-dvh w-full items-center justify-between">
      {/* 유저 입력 컴포넌트 자리 (임시 코드)*/}
      <form onSubmit={(e) => submitHandler(e)}>
        <input ref={input} id="user-input" className="border-2 border-black" />
        <button type="submit">검색버튼</button>
      </form>
      <KakaoMap userInput={userInput} />
    </main>
  );
};

export default PlanningPage;
