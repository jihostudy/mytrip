import React, { useState, useEffect } from "react";

// icon
import filterBtn from "../../../assets/icons/filterBtn.png";

// API
import { API } from "../../../api/API";

// Components
import Button from "../../UI/Button";
import PlanCard from "../../UI/PlanCard";

// Cataegory
const categoryList = ["전체", "스크랩한 여행지"];

const LoadedPlans = ({ userInput }) => {
  const [loadedPlans, setLoadedPlans] = useState([]);
  // 0: 전체 1: 스크랩
  const [isCategoryClick, setIsCategoryClick] = useState(0);
  const [isFilterClick, setIsFilterClick] = useState(false);
  // Filtering State
  const [period, setPeriod] = useState([0, 0]);
  const [people, setPeople] = useState(0);
  const [cost, setCost] = useState(0);

  // style
  const categoryBtnStyle = "px-1";
  const categoryBtnStyle_clicked = "px-1 + bg-[#ffcb16]";

  // evnetHandler
  function categoryHandler(index) {
    setIsCategoryClick(index);
  }
  function filterClickHandler() {
    // console.log("필터 클릭");
    setIsFilterClick((prev) => !prev);
  }

  // 검색된 계획 state 저장
  useEffect(() => {
    async function getPlans() {
      try {
        const res = await API.get(`/planning/post/${userInput}`);
        setLoadedPlans((prev) => res.data.plans);
        console.log(res.data.plans);
      } catch (e) {
        console.log(e);
      }
    }
    setIsCategoryClick(0);
    getPlans();
  }, [userInput]);
  // 전체, 스크랩 선택에 따른 계획 목록 변경
  useEffect(() => {
    async function getPlans() {
      try {
        const res = await API.get(`/planning/post/${userInput}`);
        setLoadedPlans((prev) => res.data.plans);
        // console.log(res.data.plans);
      } catch (e) {
        alert("다시 시도해주세요.");
        console.log(e);
      }
    }

    async function loadScrap() {
      try {
        const res = await API.get(`/my-page/scraps`);
        setLoadedPlans((prev) => res.data.scrapPlans);
        console.log(res.data);
      } catch (e) {
        alert("다시 시도해주세요.");
        console.log(e);
      }
    }

    if (isCategoryClick === 0) {
      console.log("전체 여행지 불러오기");
      getPlans();
    } else {
      console.log("스크랩한 여행지 불러오기");
      loadScrap();
    }
  }, [isCategoryClick]);

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* 버튼 */}
      <div className="flex h-[6%] w-full gap-4">
        <img
          src={filterBtn}
          alt="필터"
          onClick={filterClickHandler}
          className="hover:cursor-pointer"
        />
        {categoryList.map((item, index) => {
          return (
            <Button
              key={item + index}
              txt={item}
              clickHandler={() => categoryHandler(index)}
              custom={
                index === isCategoryClick
                  ? categoryBtnStyle_clicked
                  : categoryBtnStyle
              }
            />
          );
        })}
      </div>
      {isFilterClick && (
        <div className="flex w-full justify-between px-2">
          <div className="flex w-[25%] items-center justify-center rounded-lg border-[1px] border-solid border-black">
            <p className=" text-sm">기간</p>
            <input className="inline w-[15%]" />
            <p className=" text-sm">박</p>
            <input className="inline w-[15%]" />
            <p className=" text-sm">일</p>
          </div>
          <div className=" text-sm">인원</div>
          <div className="flex w-[25%] items-center justify-around rounded-lg border-[1px] border-solid border-black text-sm">
            <p>경비</p>
            <input className="inline w-[20%]" />
            <p>만원</p>
          </div>
          <div className=" text-sm">적용</div>
        </div>
      )}
      {/* 여행 플랜 리스트 */}
      <ul className="flex h-[90%] flex-col gap-2 overflow-hidden overflow-y-auto">
        {loadedPlans.map((plan) => {
          return (
            <PlanCard
              image={plan.image}
              name={plan.name}
              city={plan.city}
              likes={plan.likes}
              period={plan.period}
              numPeople={plan.numPeople}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LoadedPlans;
