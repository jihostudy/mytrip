import React, { useEffect, useState } from "react";

// components
import PlaceCard from "../UI/PlaceCard";

// 테스트용 장소 데이터
const dummyPlace1 = {
  image: null,
  name: "성",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace2 = {
  image: null,
  name: "균",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace3 = {
  image: null,
  name: "관",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace4 = {
  image: null,
  name: "대",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace5 = {
  image: null,
  name: "학",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace6 = {
  image: null,
  name: "교",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};

const PlanPlace = ({ setUserInput }) => {
  // 메뉴바 선택
  // 0 : 장소선택, 1: 여행지 불러오기, 2: 보관함
  const [menu, setMenu] = useState(0);
  const [placeList, setPlaceList] = useState([]);
  const [savedList, setSavedList] = useState([]);

  // css
  const menuBtnStyle = "text-xl";

  // eventHandler
  function menuClickHandler(num) {
    setMenu(num);
  }
  function saveClickHandler(place) {
    // 보관 버튼 클릭 시 isSave 값 변경
    setPlaceList((prev) => {
      const newList = prev.map((item) => {
        if (place === item) {
          item.isSave = !item.isSave;
        }
        return item;
      });

      // console.log(newList);
      return newList;
    });
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    console.log("장소 검색!");
    setUserInput((prev) => e.target.userInput.value);
  }

  // 백엔드에서 가져온 데이터
  const dummyList = [
    dummyPlace1,
    dummyPlace2,
    dummyPlace3,
    dummyPlace4,
    dummyPlace5,
    dummyPlace6,
  ];
  useEffect(() => {
    // 보관 여부 value 추가
    dummyList.forEach((place) => (place.isSave = false));
    setPlaceList(dummyList);
  }, []);
  // 보관함 state 설정
  useEffect(() => {
    setSavedList((prev) => {
      const saved = [];
      placeList.forEach((place) => {
        if (place.isSave === true) {
          saved.push(place);
        }
      });
      return saved;
    });
  }, [placeList]);

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
        <div className="flex h-[90%] flex-col gap-2 overflow-y-scroll">
          {placeList.map((place, index) => (
            <PlaceCard
              key={place.name}
              place={place}
              // index={index}
              saveClickHandler={saveClickHandler}
            />
          ))}
        </div>

        {/* <PlaceCard data={dummyPlace} /> */}
      </>
    );
    // content = <PlaceCard data={dummyPlace} />;
  } else if (menu === 1) {
    // 여행지 불러오기
    content = <div>여행지 불러오기</div>;
  } else if (menu === 2) {
    // 보관함
    console.log(savedList);
    content = (
      <div className="flex h-[90%] flex-col gap-2 overflow-y-scroll">
        {savedList.map((place) => (
          <PlaceCard
            key={place.name}
            place={place}
            saveClickHandler={saveClickHandler}
          />
        ))}
      </div>
    );
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
        <form className="w-full" onSubmit={(e) => onSubmitHandler(e)}>
          <input className="w-full" name="userInput" placeholder="검색창" />
        </form>
      </div>
      {/* contents */}
      <div className="h-[88%] pt-4">{content}</div>
    </div>
  );
};

export default PlanPlace;
