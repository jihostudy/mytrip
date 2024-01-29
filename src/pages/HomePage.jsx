import React, { useEffect, useState, useRef } from "react";
// Icons + Images
import searchIcon from "../assets/icons/searchIcon.svg";
import DummyImage1 from "../assets/images/1.jpeg";
import DummyImage2 from "../assets/images/8.jpeg";
import DummyImage3 from "../assets/images/2.jpeg";
import DummyImage4 from "../assets/images/4.jpeg";
import DummyImage5 from "../assets/images/3.jpeg";
import DummyImage6 from "../assets/images/6.jpeg";
import DummyImage7 from "../assets/images/5.jpeg";
import DummyImage8 from "../assets/images/7.jpeg";
// data
import data from "../lib/data.json";
// hooks
import { useConfirmModal } from "../hook/useConfirmModal";
// router
import { useNavigate } from "react-router";
// Dummy images
const dummy_images = [
  DummyImage1,
  DummyImage2,
  DummyImage3,
  DummyImage4,
  DummyImage5,
  DummyImage6,
  DummyImage7,
  DummyImage8,
];
// Input list
const input_list = data.regions;
// Components
import HomeImage from "../components/HomeImage";
// custom cooks
import { useInterval } from "../hook/useInterval";
// 컴포넌트
const HomePage = () => {
  const navigate = useNavigate();
  const userInput = useRef();
  const { openModal } = useConfirmModal();
  function openModalHandler(region) {
    openModal({
      content: `${region}로 떠나시나요?`,
      callback: () => {
        navigate("/planning", { state: { region: region } });
      },
    });
  }
  //-----------------------------------검색창---------------------------------------------
  const [filteredList, setFilteredList] = useState(input_list);
  const displayList = filteredList.map((list) => (
    <div
      key={list}
      className="my-1.5 w-4/5 cursor-pointer pl-4 text-[#3C3C43]/40 hover:text-black"
      onClick={(e) => openModalHandler(e.target.innerText)}
    >
      {list}
    </div>
  ));
  const findMatches = (wordToMatch) => {
    // 배열 반환
    return input_list.filter((input) => {
      const regex = new RegExp(wordToMatch, "giu");
      return input.match(regex);
    });
  };
  const inputHandler = (input) => {
    setFilteredList(findMatches(input));
  };
  // ---------------------------------인기 계획-----------------------------------------
  const numDisplayImg = 4;
  const numFetchImages = dummy_images.length; // 백엔드에서 가져온 인기 계획 개수
  const [imgIdx, setImgIdx] = useState(0);
  const [displayImg, setDisplayImg] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  useInterval(
    () => {
      setImgIdx((prev) => (prev + 1) % 10);
    },
    3000,
    isHovered,
  );
  function hoverHandler() {
    setIsHovered((prev) => !prev);
  }
  useEffect(() => {
    let imgList = [];
    for (let i = 0; i < numDisplayImg; i++) {
      imgList.push(dummy_images[(i + imgIdx) % numFetchImages]);
    }
    const updatedDisplayImg = imgList.map((img) => (
      <HomeImage img={img} key={img} onHover={hoverHandler} />
    ));

    setDisplayImg(updatedDisplayImg);
  }, [imgIdx]);
  return (
    <main className="flex h-[88%] w-full flex-col items-center justify-start">
      {/* 검색 구역 */}
      <form
        className="relative flex h-1/3 w-full flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          openModalHandler(filteredList[0]);
        }}
      >
        <div className="mb-3 text-xl">어디로 여행을 떠나시나요?</div>
        <div className="flex h-1/5 w-[28%] border-[1px] border-solid border-black">
          <img src={searchIcon} alt="검색 아이콘" className="mx-2 w-[10%]" />
          <input
            type="text"
            placeholder="여행지를 입력해주세요"
            id="region-list"
            className="h-full w-full text-sm"
            ref={userInput}
            onInput={(event) => inputHandler(event.target.value)}
          />
        </div>
        <div
          id="region-list"
          className="flex max-h-[40%] w-[28%] flex-col items-center overflow-hidden overflow-y-auto border-[1px] border-t-0 border-solid border-black bg-[#F5F5F5] text-sm"
        >
          {displayList}
        </div>
      </form>
      {/* 보여주기 구역 */}
      <div className="flex h-1/6 w-full items-center justify-center text-xl">
        🔥핫 게시글🔥
      </div>
      <div className="h-2/5 w-full">
        <ul className="flex h-full justify-evenly">{displayImg}</ul>
      </div>
      {/* Footer */}
      {/* <div className="h-1/6 w-full"></div> */}
    </main>
  );
};

export default HomePage;
