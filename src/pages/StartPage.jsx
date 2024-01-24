import React from "react";

// router
import { useNavigate } from "react-router-dom";

// image
import character from "../assets/images/character.png";

const StartPage = () => {
  const navigate = useNavigate();

  function onClickHandler() {
    navigate("/home");
  }

  return (
    <>
      <div className="absolute top-0 h-1/5 w-full bg-gradient-to-b from-[#38C3FF] from-0% via-[#cde3ed94] via-60% to-[#d9d9d900] to-100%"></div>
      <div className="flex h-screen w-full flex-col items-center ">
        <div className="flex h-1/3 w-full items-end justify-center">
          <button
            className="aspect-square w-1/12 rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
            onClick={onClickHandler}
          >
            시작
          </button>
        </div>
        <div className="flex h-1/4 flex-col items-center justify-center gap-3">
          <p className="text-lg">
            신발을 신고 나서면 언제나 그 순간에, 그리고 그 장소에 존재할 수가
            있었다.
          </p>
          <p className="text-lg">- 류시화, 지구별 여행자 -</p>
        </div>
      </div>
      <img
        className="absolute bottom-[10%] right-[46%] z-20 h-1/4"
        src={character}
        alt="이방인"
      />
      <div className="absolute bottom-0 flex h-1/5 w-full justify-center rounded-[50%] bg-gradient-radial from-[#CD8B3E] via-[#E8B57900] via-70% to-[#E8B57900]"></div>
    </>
  );
};

export default StartPage;
