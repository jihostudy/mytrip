import React, { useState, useEffect } from "react";

// components
import SelectPlace from "./SelectPlace";
import LoadedPlans from "./LoadedPlans";
import SavedPlace from "./SavedPlace";

// recoil
import { useRecoilState } from "recoil";
import { planState } from "../../../lib/constants/plandata";

// icon
import searchIcon from "../../../assets/icons/searchIcon.png";

// API
import { API } from "../../../api/API";

const PlanPlace = ({ setUserInput, userInput }) => {
  // 메뉴바 선택
  // 0 : 장소선택, 1: 여행지 불러오기, 2: 보관함
  const [menu, setMenu] = useState(0);
  // 장소 리스트
  const [placeList, setPlaceList] = useState([]); // 첫 렌더링 or 검색 시 db에서 가져오는 데이터
  const [savedList, setSavedList] = useState([]); // 보관함
  const [filteredList, setFilteredList] = useState([]); // 가져온 리스트 내 검색
  // 카테고리

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
  // 보관 기능
  function saveClickHandler(place) {
    // 보관 버튼 클릭 시 isSave 값 변경
    setPlaceList((prev) => {
      const newList = prev.map((item) => {
        if (place.id === item.id) {
          item.isSave = !item.isSave;
        }
        return item;
      });

      return newList;
    });

    setSavedList((prev) => {
      let filtered = [];
      if (prev.includes(place)) {
        filtered = prev.filter((item) => {
          return item !== place;
        });
      } else {
        console.log(filtered);
        filtered = [...prev, place];
      }

      if (menu === 2) {
        setFilteredList(filtered);
      }

      return filtered;
    });
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    // console.log("지도 검색!");
    setUserInput((prev) => e.target.userInput.value);
  }
  function onInputHandler(e) {
    e.preventDefault();
    // console.log("검색어 필터링!");

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
        break;
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

  // 백엔드에서 가져온 데이터
  useEffect(() => {
    // console.log(userInput);
    async function getPlace() {
      try {
        const res = await API(`/planning/data/${userInput}`);

        const list = [];
        // console.log(userInput);
        // console.log(typeof []);
        // 검색어에 따라 백엔드 응답 양식이 달라서 케이스 나눠서 리스트 저장..
        if (Array.isArray(res.data.destinationList)) {
          const region = res.data.destinationList;
          region.map((items) => {
            items["지역"]["여행지"].map((item) => {
              list.push({
                name: item["이름"],
                address: items["도시"],
                latlag: item["좌표"],
                id: item.id,
              });
            });
          });
        } else {
          const region = res.data.destinationList["지역"];
          region.map((items) => {
            items["여행지"].map((item) => {
              list.push({
                name: item["이름"],
                address: items["도시"],
                latlag: item["좌표"],
                id: item.id,
              });
            });
          });
        }

        list.forEach((place, index) => {
          place.isSave = false;
          const id = place.id;
          // console.log(savedList);
          savedList.forEach((item) => {
            if (item.id === id && item.isSave === true) {
              list[index].isSave = true;
            }
          });
        });
        setPlaceList(list);
        setFilteredList(list);
        console.log(list);
      } catch (e) {
        console.log(e);
      }
    }

    getPlace();
  }, [userInput]);

  // menu에 따른 content
  let content;
  if (menu === 0) {
    // 장소선택
    content = (
      <SelectPlace
        saveClickHandler={saveClickHandler}
        filteredList={filteredList}
      />
    );
  } else if (menu === 1) {
    // 여행지 불러오기
    content = <LoadedPlans userInput={userInput} />;
  } else if (menu === 2) {
    // 보관함
    content = (
      <SavedPlace
        saveClickHandler={saveClickHandler}
        filteredList={filteredList}
      />
    );
  }

  // ------------------------------------------------------------------
  // 보관함 recoil
  const [plans, setPlans] = useRecoilState(planState);

  useEffect(() => {
    const destinationCart = [];
    // 리스트 내의 객체까지 깊은 복사해야됨 ...
    savedList.forEach((item) => {
      destinationCart.push({ ...item });
    });
    setPlans((prev) => ({
      ...prev,
      destinationCart: destinationCart,
    }));
  }, [savedList]);
  // console.log(plans);

  return (
    <div className="h-full w-[33%] p-3 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
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
