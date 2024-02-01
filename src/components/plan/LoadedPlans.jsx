import React, { useState, useEffect } from "react";

// icon
import filterBtn from "../../assets/icons/filterBtn.png";

// API
import { API } from "../../api/API";

// Components
import Button from "../UI/Button";
import PlanCard from "../UI/PlanCard";

// Cataegory
const categoryList = ["전체", "스크랩한 여행지"];

const LoadedPlans = ({ userInput }) => {
  const [loadedPlans, setLoadedPlans] = useState([]);
  // 0: 전체 1: 스크랩
  const [isCategoryClick, setIsCategoryClick] = useState(0);
  // 쿼리는 state로??

  // style
  const categoryBtnStyle = "px-1";
  const categoryBtnStyle_clicked = "px-1 + bg-[#ffcb16]";

  // evnetHandler
  function categoryHandler(index) {
    setIsCategoryClick(index);
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
        // console.log(res.data);
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
      <div className="flex h-[6%] gap-4 ">
        <img src={filterBtn} alt="필터" />
        {categoryList.map((item, index) => {
          return (
            <Button
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
        {/* <Button txt="전체" custom="px-2" clickHandler={categoryHandler} />
        <Button
          txt="스크랩한 여행지"
          custom="px-2"
          clickHandler={categoryHandler}
        /> */}
      </div>
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
