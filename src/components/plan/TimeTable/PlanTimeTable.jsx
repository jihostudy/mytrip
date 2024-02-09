import React, { useEffect, useState } from "react";
// icons & images
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
// date-fns
import { format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
// Components
import TimeLine from "./TimeLine";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultPlanState,
  planState,
  currDate,
  loadedPlanState,
  loadedCurrDate,
} from "../../../lib/constants/plandata";

const PlanTimeTable = ({ classify, planData, watchPlanHandler }) => {
  const isMain = classify === "plan" ? true : false;

  const [data, setData] = isMain
    ? useRecoilState(planState)
    : useRecoilState(loadedPlanState);

  const [date, setDate] = isMain
    ? useRecoilState(currDate)
    : useRecoilState(loadedCurrDate);
  useEffect(() => {
    if (!isMain) {
      setData({
        id: planData._id,
        region: planData.city,
        title: planData.name,
        description: planData.description,
        image: planData.image,
        date: planData.date, // 시작-끝 날짜
        period: planData.period, //몇일?
        totalCost: planData.totalCost,
        numPeople: planData.numPeople,
        likes: planData.likes,
        scraps: planData.scraps,
        shareURI: planData.shareUri,
        isPublic: planData.isPublic,
        isDone: planData.isDone,
        schedule: planData.schedule, // 방문 장소들
        destinationCart: planData.destinationCart, //보관함
      });
      return () => setData(defaultPlanState);
    }
  }, []);
  useEffect(() => {
    if (isMain) {
      console.log(date.currDate);
    }
  }, [date]);
  function dateHandler(verify, value) {
    if (verify === "down" && value != 1) {
      setDate((prev) => ({
        currDate: prev.currDate - 1,
      }));
    } else if (verify === "up" && value < data.period) {
      setDate((prev) => ({
        currDate: prev.currDate + 1,
      }));
    }
  }
  // -----------------------------------오늘 날짜 계산----------------------------
  let todayDate;
  if (data.date.start != null) {
    const startDate = new Date(data.date.start);
    todayDate = format(addDays(startDate, date.currDate - 1), "L.dd");
    todayDate += format(addDays(startDate, date.currDate - 1), " (E)", {
      locale: ko,
    });
  }

  // -----------------------------------planComponents----------------------------
  let hourArr = [];
  let time = new Date();
  for (let i = 0; i < 24; i++) {
    time.setHours(i + 5, 0, 0, 0);
    hourArr.push((i + 5) % 24);
  }
  // console.log(hourArr);
  const planComponents = hourArr.map((hour) => (
    <TimeLine key={hour} hour={hour} isMain={isMain} />
  ));
  // Style
  const containerStyle = isMain
    ? "relative h-full w-[30%] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
    : "relative h-full w-full";
  const currDateStyle = isMain
    ? "relative flex h-[10%] w-full items-center justify-evenly"
    : "relative flex h-[12%] w-full items-center justify-evenly";
  const dateStyle = isMain
    ? "flex h-3/5 w-[24%] items-center justify-center rounded-lg border-1 border-solid border-black bg-[#38C3FF] text-sm"
    : "flex h-[58%] w-[12%] items-center justify-center rounded-lg border-1 border-solid border-black bg-[#38C3FF] text-xs";
  return (
    <div className={containerStyle}>
      {isMain && (
        <p className="flex h-[10%] w-full items-center justify-center text-base">
          여행 시간표
        </p>
      )}

      <div className={currDateStyle}>
        {!isMain && (
          <button
            onClick={watchPlanHandler}
            className="absolute left-0 h-[58%] w-[12%] rounded-lg border-1 border-solid border-black bg-[#ffcb16] text-xs hover:cursor-pointer"
          >
            이전
          </button>
        )}
        {date.currDate != 1 && (
          <BiSolidLeftArrow
            className="absolute left-[30%] hover:cursor-pointer"
            onClick={() => dateHandler("down", date.currDate)}
          />
        )}
        <p className={dateStyle}>
          {isMain ? todayDate : date.currDate + "일차"}
        </p>
        {date.currDate != data.period && (
          <BiSolidRightArrow
            className="absolute right-[30%] hover:cursor-pointer"
            onClick={() => {
              console.log("clicked up");
              dateHandler("up", date.currDate);
            }}
          />
        )}
      </div>
      <ul
        id="dropContainer"
        className="relative flex h-4/5 w-full flex-col items-start justify-start overflow-hidden overflow-y-auto"
      >
        {planComponents}
      </ul>
    </div>
  );
};

export default PlanTimeTable;
