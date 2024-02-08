import React, { useEffect } from "react";
// router
import { useNavigate, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();
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
  //-----------------------------------------------------Functions-----------------------------------------------------
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
  // 저장
  function saveHandler() {}
  // 제출
  function submitHandler() {
    navigate("/planning/result");
  }
  return (
    <div className="flex h-[18%] w-[93%] items-start justify-between">
      <div className="flex h-[70%] w-1/4 items-end justify-start">
        <p className="mr-4 flex h-full w-[30%] items-end text-4xl">{region}</p>
        <div className="relative z-30 flex h-full w-[70%] items-end">
          <button
            onClick={resetDate}
            className={
              !date.start ? "relative z-20 text-white" : "tracking-widest"
            }
          >
            {planPeriod}
          </button>
          {!date.start && (
            <>
              <div className="fixed inset-0 h-full w-screen bg-black/70" />
              <CalenderContainer />
            </>
          )}
        </div>
      </div>

      <div className="relative flex h-4/5 w-[40%] items-end justify-end">
        <button
          className="mr-[5%] h-[40%] w-[16.4%] rounded-lg border-1 border-solid border-black text-sm"
          onClick={saveHandler}
        >
          저장
        </button>
        <button
          className="h-[40%] w-[16.4%] rounded-lg border-1 border-solid border-black bg-[#ffcb16] text-sm"
          onClick={submitHandler}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PlanHeader;

// 88 40
