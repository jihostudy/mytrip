import React, { useEffect, useState } from "react";
// Components
import Calender from "./Calender";
// date-fns
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import koLocale from "date-fns/locale/ko";
// recoil
import { useRecoilState } from "recoil";
import { planState, getDateDiff } from "../../lib/constants/plandata";
// function
function addMonth(currDate) {
  return new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    currDate.getDate(),
  );
}
const initSchedule = { start: null, end: null };
const CalenderContainer = () => {
  const [data, setData] = useRecoilState(planState);
  // End: 제출
  function submitDate() {
    let start = format(schedule.start, "yyyy.MM.dd");
    let end;
    let period;
    // 당일치기
    if (!schedule.end) {
      end = start;
    } else {
      end = format(schedule.end, "yyyy.MM.dd");
    }
    period = getDateDiff(start, end);

    setData((prev) => ({
      ...prev,
      date: {
        start: start,
        end: end,
      },
      period: period,
    }));
  }
  const today = new Date();

  const [schedule, setSchedule] = useState(initSchedule);

  function onDateClick(day) {
    // #0. 첫 클릭

    if (!schedule.start) {
      setSchedule((prev) => ({
        ...prev,
        start: day,
      }));
    }
    // #1. 두번째 클릭
    else if (schedule.start && !schedule.end) {
      // #1-1 같은 곳 클릭(취소)
      if (isSameDay(schedule.start, day)) {
        setSchedule(initSchedule);
      }
      // #1-2 다음 장소 클릭 - 미래
      else if (isBefore(schedule.start, day)) {
        setSchedule((prev) => ({
          ...prev,
          end: day,
        }));
      }
      // #1-3 다음 장소 클릭 - 과거
      else if (isAfter(schedule.start, day)) {
        setSchedule((prev) => ({
          start: day,
          end: prev.start,
        }));
      }
    }
    // #2. 세번째 클릭
    else if (schedule.end) {
      // #2-1 생뚱 맞은곳 클릭 -> 초기화 + 해당 장소를 시작지점으로 설정
      setSchedule({
        start: day,
        end: null,
      });
    }
  }
  //------------------------------------display-------------------------------------
  let startDate = null;
  let endDate = null;
  let period = null;
  // 하나만 입력
  if (schedule.start && !schedule.end) {
    startDate = format(schedule.start, "yyyy.MM.dd (iii)", {
      locale: koLocale,
    });
    period = " (1박)";
  }
  // 두개 입력
  else if (schedule.start && schedule.end) {
    startDate = format(schedule.start, "yyyy.MM.dd (iii)", {
      locale: koLocale,
    });
    endDate = format(schedule.end, "yyyy.MM.dd (iii)", { locale: koLocale });
    period = " (" + getDateDiff(startDate, endDate) + "박)";
    startDate += " - ";
  }
  // Button
  const ableBtn =
    "absolute right-0 aspect-[2/1] w-[14%] rounded-md bg-[#38C3FF]";
  const disableBtn =
    "absolute right-0 aspect-[2/1] w-[14%] rounded-md bg-[#6668692d]";
  //------------------------------------hover-------------------------------------

  const [hoverDate, setHoverDate] = useState(null);
  let tempDate = { tempStart: null, tempEnd: null };
  if (hoverDate) {
    if (isAfter(hoverDate, schedule.start)) {
      tempDate = {
        tempStart: schedule.start,
        tempEnd: hoverDate,
      };
    } else {
      tempDate = {
        tempStart: hoverDate,
        tempEnd: schedule.start,
      };
    }
  }
  function hoverHandler(value) {
    setHoverDate(value);
  }

  return (
    <div className="absolute top-[120%] flex aspect-[1.85/1] w-[343%] flex-col items-center justify-between rounded-xl border-[1px] border-solid border-black bg-white">
      <div className="flex h-[65%] w-[90%] justify-between text-sm">
        <Calender
          date={today}
          schedule={schedule}
          onDateClick={onDateClick}
          tempDate={tempDate}
          onHoverHandler={hoverHandler}
        />
        <Calender
          date={addMonth(today)}
          schedule={schedule}
          onDateClick={onDateClick}
          tempDate={tempDate}
          onHoverHandler={hoverHandler}
        />
      </div>
      <div className="relative flex h-[25%] w-[90%] items-center justify-center border-t-[0.5px] border-solid border-[#BDBDBD]">
        <p className="flex h-[50%] w-[82%] items-center justify-center text-lg font-semibold">
          {startDate}
          {endDate}
          {period}
        </p>
        <button
          className={schedule.start ? ableBtn : disableBtn}
          onClick={submitDate}
          disabled={schedule.start ? false : true}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CalenderContainer;
