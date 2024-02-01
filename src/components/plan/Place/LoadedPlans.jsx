import React, { useState, useEffect } from "react";

// icon
import filterBtn from "../../../assets/icons/filterBtn.png";
import MinusIcon from "../../../assets/icons/Minus.svg?react";
import PlusIcon from "../../../assets/icons/Plus.svg?react";

// API
import { API } from "../../../api/API";

// Components
import Button from "../../UI/Button";
import PlanCard from "./PlanCard";
import LoadTimeTable from "./LoadTimeTable";

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
  // 여행 계획 보기
  const [watchPlan, setWatchPlan] = useState(false);
  const [planData, setPlanData] = useState({});

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
  function periodHandler(idx, e) {
    setPeriod((prev) => {
      prev[idx] = e.target.value;
      return prev;
    });
  }
  function peopleHandler(action) {
    if (action === "plus") {
      setPeople((prev) => prev + 1);
    } else if (action === "minus") {
      setPeople((prev) => prev - 1);
    }
  }
  function costHandler(e) {
    setCost(e.target.value);
  }
  // filtering handler
  function submitHandler() {
    let query = "?";
    if (period[0] === 0 && period[1] === 0) {
      // query += `period=${period}&`
    }
    if (cost !== 0) {
      query += `cost=${cost * 10000}&`;
    }
    if (people !== 0) {
      query += `num=${people}`;
    }
    console.log(query);

    async function filtering() {
      try {
        const res = await API.get(`/planning/post/${userInput}`);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    // filtering();
  }
  // 여행 계획 보기 (Time Table)
  function watchPlanHandler(index) {
    setWatchPlan((prev) => !prev);
    setPlanData(loadedPlans[index]);
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
    <>
      {watchPlan ? (
        <div>
          <button
            onClick={watchPlanHandler}
            className="rounded-lg border-[1px] border-solid border-black bg-[#ffcb16] px-2 text-sm"
          >
            이전
          </button>
          {/* ------------------ 시간표 태그 -------------------------------- */}
          <LoadTimeTable plan={planData} />
          {/* ------------------------------------------------------------- */}
        </div>
      ) : (
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
          {/* 필터링 */}
          {isFilterClick && (
            <div className="flex w-full justify-between">
              {/* 기간 */}
              <div className="flex w-[25%] items-center justify-center rounded-lg border-[1px] border-solid border-black">
                <p className=" text-sm">기간</p>
                <input
                  className="inline w-[15%]"
                  onChange={(e) => periodHandler(0, e)}
                />
                <p className="text-sm">박</p>
                <input
                  className="inline w-[15%]"
                  onChange={(e) => periodHandler(1, e)}
                />
                <p className=" text-sm">일</p>
              </div>
              {/* 인원 */}
              <div className="flex w-[30%] items-center justify-around gap-1 rounded-lg border-[1px] border-solid border-black text-sm">
                <p>인원</p>
                <button>
                  <MinusIcon
                    stroke="#989BA7"
                    fill="none"
                    className="w-[80%] hover:fill-red-200 hover:stroke-black"
                    onClick={() => peopleHandler("minus")}
                  />
                </button>
                <p>{people}</p>
                <button>
                  <PlusIcon
                    stroke="#989BA7"
                    fill="none"
                    className="w-[80%] hover:fill-blue-200 hover:stroke-black"
                    onClick={() => peopleHandler("plus")}
                  />
                </button>
              </div>
              {/* 경비 */}
              <div className="flex w-[25%] items-center justify-around rounded-lg border-[1px] border-solid border-black text-sm">
                <p>경비</p>
                <input
                  className="inline w-[20%]"
                  onChange={(e) => costHandler(e)}
                />
                <p>만원</p>
              </div>
              <button
                className="hover: rounded-lg bg-[#33b2e9] px-1 text-sm hover:bg-[#32a6d8]"
                onClick={submitHandler}
              >
                적용
              </button>
            </div>
          )}
          {/* 여행 플랜 리스트 */}
          <ul className="flex h-[90%] flex-col gap-2 overflow-hidden overflow-y-auto">
            {loadedPlans.map((plan, index) => {
              return (
                <PlanCard
                  index={index}
                  key={plan._id + "load"}
                  image={plan.image}
                  name={plan.name}
                  city={plan.city}
                  likes={plan.likes}
                  period={plan.period}
                  numPeople={plan.numPeople}
                  onClick={watchPlanHandler}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default LoadedPlans;
