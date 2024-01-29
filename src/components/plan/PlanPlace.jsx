import React, { useEffect, useState } from "react";

// components
import PlaceCard from "../UI/PlaceCard";

// 테스트용 장소 데이터
const dummyPlace = {
  image: null,
  name: "성균관대학교",
  address: "경기도 수원시 장안구 서부로 2066",
  isSave: false,

  // rating??
};
const dummyPlaceList = [
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
  dummyPlace,
];

const PlanPlace = ({ planHandler }) => {
  // 메뉴바 선택
  // 0 : 장소선택, 1: 여행지 불러오기, 2: 보관함
  const [menu, setMenu] = useState(0);

  // css
  const menuBtnStyle = "text-xl";

  // eventHandler
  function menuClickHandler(num) {
    setMenu(num);
  }

  // menu에 따른 content (메뉴 이동 간에 지워지면 안되니까 state에 저장??, 보관함은 무조건)
  let content;
  if (menu === 0) {
    // 장소선택
    content = (
      <>
        {/* 카테고리 */}
        <div className="flex h-[8%] gap-3 pb-4">
          <button>추천 장소</button>
          <button>맛집</button>
          <button>카페</button>
          <button>숙소</button>
        </div>
        {/* 장소 리스트 */}
        <ul className="flex h-[90%] flex-col gap-2 overflow-hidden overflow-y-auto">
          {dummyPlaceList.map((place, index) => (
            <PlaceCard key={index} data={place} planHandler={planHandler} />
          ))}
        </ul>

        {/* <PlaceCard data={dummyPlace} /> */}
      </>
    );
    // content = <PlaceCard data={dummyPlace} />;
  } else if (menu === 1) {
    // 여행지 불러오기
    content = <div>여행지 불러오기</div>;
  } else if (menu === 2) {
    // 보관함
    content = <div>보관함</div>;
  }

  return (
    <div className="h-full w-[32%] border border-solid border-black p-3">
      {/* 선택 바 + 검색 (고정) */}
      <div className="flex h-[12%] flex-col gap-3">
        {/* 선택 바 */}
        <div className="flex gap-3">
          <button className="text-xl" onClick={() => menuClickHandler(0)}>
            장소 선택
          </button>
          <button className={menuBtnStyle} onClick={() => menuClickHandler(1)}>
            여행지 불러오기
          </button>
          <button className={menuBtnStyle} onClick={() => menuClickHandler(2)}>
            보관함
          </button>
        </div>
        {/* 검색 */}
        <input placeholder="검색창" />
      </div>
      <div className="h-[88%] pt-4">{content}</div>
    </div>
  );
};

export default PlanPlace;
