import React, { useEffect, useState } from "react";
// Components
import Calender from "./Calender";
// date-fns
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import koLocale from "date-fns/locale/ko";
// function
function addMonth(currDate) {
  return new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    currDate.getDate(),
  );
}
function getDateDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
}
const initSchedule = { start: null, end: null };
const CalenderContainer = (props) => {
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
    startDate = format(schedule.start, "yy.MM.dd iii", {
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

  return (
    <div className="absolute top-[120%] flex h-[550%] w-[502%] flex-col items-center justify-around rounded-xl border-[1px] border-solid border-black bg-white">
      <div className="flex h-[70%] w-[90%] justify-between text-sm">
        <Calender date={today} schedule={schedule} onDateClick={onDateClick} />
        <Calender
          date={addMonth(today)}
          schedule={schedule}
          onDateClick={onDateClick}
        />
      </div>
      <div className="relative flex h-[25%] w-[90%] items-center justify-center border-t-2 border-solid border-black">
        <p className="flex h-[50%] w-[82%] items-center justify-center text-lg font-semibold">
          {startDate} {endDate}
          {period}
        </p>
        <button
          className="absolute right-0 h-1/2 w-[15%] rounded-md bg-[#38C3FF]"
          onClick={() => {
            props.dateHandler(schedule);
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default CalenderContainer;
