import React, { useEffect } from "react";
// router
import { useLocation } from "react-router-dom";
// recoil
import { planState } from "../../lib/constants/plandata";
import { useRecoilState } from "recoil";
// components
import Button from "../UI/Button";
import CalenderContainer from "../Calender/CalenderContainer";
// Icons
// import { BsCalendarDate } from "react-icons/bs";
const PlanHeader = (props) => {
  const [data, setData] = useRecoilState(planState);
  // 초기화
  function resetDate() {
    setData((prev) => ({
      ...prev,
      date: {
        start: null,
        end: null,
      },
      period: null,
    }));
  }
  const location = useLocation();
  const region = location.state.region.slice(0, 2);

  const { date } = data;
  let planPeriod;
  if (!date.start) {
    planPeriod = "날짜를 입력해주세요";
  } else {
    // 당일치기
    // console.log(date);
    if (date.start === date.end) planPeriod = date.start;
    else planPeriod = date.start + " ~ " + date.end;
  }
  return (
    <div className="flex h-[15%] w-[93%] items-start justify-between">
      <div className="flex h-3/5 w-1/2 items-end justify-start">
        <p className="mr-4 flex h-full w-[15%] items-end text-4xl">{region}</p>
        {/* <BsCalendarDate /> */}
        <div className="relative z-30 flex h-full items-end">
          <button onClick={resetDate}>{planPeriod}</button>
          {!date.start && (
            <>
              <div className="fixed inset-0 h-full w-screen bg-black/70" />
              <CalenderContainer />
            </>
          )}
        </div>
      </div>

      <div className="relative flex h-3/5 w-[14%] items-end justify-around">
        <button className="h-[55%] w-[44%] rounded-lg border-[1px] border-solid border-black">
          저장
        </button>
        <button className="h-[55%] w-[44%] rounded-lg border-[1px] border-solid border-black bg-[#ffcb16]">
          다음
        </button>
      </div>
    </div>
  );
};

export default PlanHeader;

// 88 40
