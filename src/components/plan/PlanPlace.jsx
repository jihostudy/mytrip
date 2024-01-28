import React, { useEffect, useState } from "react";

// components
import PlaceCard from "../UI/PlaceCard";

// icon
import searchIcon from "../../assets/icons/searchIcon.png";

// 테스트용 장소 데이터
const dummyPlace1 = {
  image: null,
  name: "성균",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace2 = {
  image: null,
  name: "균관",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace3 = {
  image: null,
  name: "관대",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace4 = {
  image: null,
  name: "대학",
  address: "경기도 수원시 장안구 서부로 2066",

  // rating??
};
const dummyPlace5 = {
  image: null,
  name: "학교",
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
  const [filteredList, setFilteredList] = useState([]);

  // css
  const menuBtnStyle = "text-lg text-gray-400 ";
  const menuBtnStyle_clicked = "text-lg ";

  // eventHandler
  function menuClickHandler(num) {
    setMenu(num);
    if (num === 0) {
      setFilteredList(placeList);
    } else if (num === 1) {
    } else if (num === 2) {
      setFilteredList(savedList);
    }
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
    console.log("지도 검색!");
    setUserInput((prev) => e.target.userInput.value);
  }
  function onInputHandler(e) {
    e.preventDefault();
    console.log("검색어 필터링!");

    const userInput = e.target.value;

    switch (menu) {
      // 장소 선택 -> 검색 시
      case 0:
        if (userInput === "") {
          setFilteredList(placeList);
        } else {
          setFilteredList((prev) => {
            const list = placeList.filter((item) =>
              item.name.includes(userInput),
            );
            return list;
          });
          // console.log(filteredList);
        }
        break;
      // 여행지 불러오기 -> 검색 시
      case 1:
      // 보관함 -> 검색시
      case 2:
        if (userInput === "") {
          setFilteredList(savedList);
        } else {
          setFilteredList((prev) => {
            const list = savedList.filter((item) =>
              item.name.includes(userInput),
            );
            return list;
          });
          // console.log(filteredList);
        }
        break;
      default:
    }
  }

  // 백엔드에서 가져온 데이터 => dummyList 변경 후 데스트 할 것.
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
    setFilteredList(dummyList);
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
      // 버튼 클릭시 보관함서 바로 제거
      if (menu === 2) {
        setFilteredList(saved);
      }

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
          {filteredList.map((place, index) => (
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
    // console.log(savedList);
    // console.log(filteredList);
    content = (
      <div className="flex h-[90%] flex-col gap-2 overflow-y-scroll">
        {filteredList.map((place) => (
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
      <div className="flex h-[12%] flex-col">
        {/* 선택 바 */}
        <div className="flex gap-3">
          <button
            className={menu === 0 ? menuBtnStyle_clicked : menuBtnStyle}
            onClick={() => menuClickHandler(0)}
          >
            장소 선택
          </button>
          <button
            className={menu === 1 ? menuBtnStyle_clicked : menuBtnStyle}
            onClick={() => menuClickHandler(1)}
          >
            여행지 불러오기
          </button>
          <button
            className={menu === 2 ? menuBtnStyle_clicked : menuBtnStyle}
            onClick={() => menuClickHandler(2)}
          >
            보관함
          </button>
        </div>
        {/* 검색 */}
        <form
          className="flex h-1/2 w-full grow border-b border-solid"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <button type="submit">
            <img src={searchIcon} alt="searchIcon" className="h-full" />
          </button>
          <input
            className="w-full focus:outline-none"
            name="userInput"
            onInput={(e) => onInputHandler(e)}
          />
        </form>
      </div>
      {/* contents */}
      <div className="h-[88%] pt-4">{content}</div>
    </div>
  );
};

export default PlanPlace;
