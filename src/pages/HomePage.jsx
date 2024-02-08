import React, { useEffect, useState, useRef } from "react";
// Icons + Images
import { IoSearch } from "react-icons/io5";
import DummyImage1 from "../assets/images/1.svg";
import DummyImage2 from "../assets/images/2.svg";
import DummyImage3 from "../assets/images/3.svg";
import DummyImage4 from "../assets/images/4.svg";
// data
import data from "../lib/data.json";
// hooks
import { useConfirmModal } from "../hook/useConfirmModal";
import { useDetectClose } from "../hook/useDetectClose";
// router
import { useNavigate } from "react-router";
// recoil
import { user } from "../lib/constants/userInfo";
import { useRecoilValue } from "recoil";
// Dummy images
const dummy_images = [DummyImage1, DummyImage2, DummyImage3, DummyImage4];
// Input list
const input_list = data[0].regions;
// Components
import HomeImage from "../components/HomeImage";
// custom cooks
import { useInterval } from "../hook/useInterval";
// 컴포넌트
const HomePage = () => {
  const userInfo = useRecoilValue(user);

  const filteredListRef = useRef(null);
  const [isOpen, setIsOpen, toggleDropdown] = useDetectClose(
    filteredListRef,
    false,
  );
  const navigate = useNavigate();
  const { openModal } = useConfirmModal();
  function openModalHandler(region) {
    // 로그인 안한 경우
    if (!userInfo.isLogin) {
      openModal({
        content:
          "여행 계획을 짜려면 로그인이 필요합니다.\n로그인 하시겠습니까?",
        callback: () => {
          navigate("/home/auth/login");
        },
      });
      return;
    }
    // 로그인 한 경우
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
      className="my-1.5 h-1/2 w-[78%] cursor-pointer text-[#3C3C43]/40 hover:text-black"
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
      <HomeImage
        img={img}
        key={img}
        onHover={hoverHandler}
        text={`곧 조정됩니다`}
      />
    ));

    setDisplayImg(updatedDisplayImg);
  }, [imgIdx]);

  // styles
  let containerStyle;
  let searchStyle;
  let regionStyle;
  if (!isOpen) {
    containerStyle =
      "relative flex h-1/4 w-[28%] flex-col items-center justify-start rounded-lg bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]";
    searchStyle =
      "relative my-[1%] flex h-[84%] w-[98%] items-center rounded-lg bg-[#F5F5F5]";
    regionStyle =
      "relative flex h-[14%] w-full flex-col items-center overflow-hidden bg-white text-sm";
  } else {
    if (filteredList.length === 1) {
      containerStyle =
        "relative flex h-1/2 w-[28%] flex-col items-center justify-start rounded-lg bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]";
      searchStyle =
        "relative my-[1%] flex h-[42%] w-[98%] items-center rounded-lg bg-[#F5F5F5]";
      regionStyle =
        "relative flex h-[56%] w-full flex-col items-center overflow-hidden bg-white text-sm";
    } else if (filteredList.length === 2) {
      containerStyle =
        "relative flex h-3/4 w-[28%] flex-col items-center justify-start rounded-lg bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]";
      searchStyle =
        "relative my-[1%] flex h-[21%] w-[98%] items-center rounded-lg bg-[#F5F5F5]";
      regionStyle =
        "relative flex h-[78%] w-full flex-col items-center overflow-hidden bg-white text-sm";
    }
    //2 초과
    else {
      containerStyle =
        "relative flex h-3/4 w-[28%] flex-col items-center justify-start rounded-lg bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.25)]";
      searchStyle =
        "relative my-[1%] flex h-[31%] w-[98%] items-center rounded-lg bg-[#F5F5F5]";
      regionStyle =
        "relative flex h-[69%] w-full flex-col items-center overflow-hidden bg-white text-sm";
    }
  }

  return (
    <main className="flex h-[87.2dvh] w-full flex-col items-center justify-start">
      {/* 검색 구역 */}
      <form
        className="relative top-[5%] flex h-1/3 w-full flex-col items-center justify-start"
        onSubmit={(e) => {
          e.preventDefault();
          openModalHandler(filteredList[0]);
        }}
      >
        <div className="mb-3 text-2xl font-medium">어디로 가시나요?</div>

        <div className={containerStyle} ref={filteredListRef}>
          <div className={searchStyle}>
            <IoSearch
              style={{ width: "10%", height: "50%" }}
              title="검색 아이콘"
            />
            <input
              type="text"
              placeholder="여행지를 검색해보세요"
              id="region-list"
              className="h-full w-[90%] rounded-lg bg-[#F5F5F5] text-sm"
              onInput={(event) => inputHandler(event.target.value)}
              onFocus={toggleDropdown}
            />
          </div>
          {isOpen && (
            <div
              id="region-list"
              // className="flex h-full max-h-[40%] w-full flex-col items-center overflow-hidden overflow-y-auto border-[1px] border-t-0 border-solid border-black bg-[#F5F5F5] text-sm"
              className={regionStyle}
            >
              {displayList}
            </div>
          )}
        </div>
      </form>
      {/* 보여주기 구역 */}
      <div className="flex h-1/6 w-full items-center justify-center text-base">
        여행자들의 픽
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
