import React, { useState, useEffect, useRef } from "react";
// date-fns
import { format, setHours, getHours, getMinutes, formatters } from "date-fns";
// recoil
const PlanResultTimeTable = ({ schedule, nDay }) => {
  let hourArr = [];
  let time = new Date();
  for (let i = 0; i < 24; i++) {
    time.setHours(i + 5, 0, 0, 0);
    hourArr.push((i + 5) % 24);
  }
  const planComponents = hourArr.map((hour) => (
    <ResultTimeLine key={hour} hour={hour} schedule={schedule} nDay={nDay} />
  ));
  return (
    <div className="h-full min-w-[30%]">
      <div className="flex h-1/6 w-full items-start justify-start">
        <p className="boder-1 relative left-[5%] top-[30%] flex h-2/5 w-1/6 items-center justify-center rounded-md border-1 border-solid border-black bg-[#38C3FF]">
          {nDay}일차
        </p>
      </div>
      <ul className="relative flex h-5/6 flex-col overflow-hidden overflow-y-auto">
        {planComponents}
      </ul>
    </div>
  );
};

export default PlanResultTimeTable;

const ResultTimeLine = ({ hour, schedule, nDay }) => {
  const parentRef = useRef();
  const minuteArr = [0, 30];
  // ["04:00","04:30"] 형식으로 들어있음
  const formattedTime = minuteArr.map((minute) => {
    let time = new Date();
    time.setHours(hour, minute, 0, 0);
    return time;
  });
  // console.log(formattedTime);
  return (
    <li
      ref={parentRef}
      className="relative flex min-h-[16.66%] flex-col items-end justify-evenly border-b-1 border-solid border-[#CBC8C8]"
    >
      <div className="absolute left-[2%] w-[16%]">
        {format(formattedTime[0], "hh:mm")}
      </div>
      {formattedTime.map((time) => (
        <ResultTimeFraction
          key={time}
          hour={getHours(time)} // 숫자
          minute={getMinutes(time)} // 숫자
          nDay={nDay}
          schedule={schedule}
          parentRef={parentRef}
        />
      ))}
    </li>
  );
};

const ResultTimeFraction = ({ hour, minute, schedule, nDay, parentRef }) => {
  let resultSchedule;

  const dataExist = schedule.some((schedule) => {
    const isMatching =
      schedule.nDay === nDay &&
      schedule.startTime.hour === hour &&
      schedule.startTime.minute === minute;

    if (isMatching) {
      resultSchedule = schedule;
    }

    return isMatching;
  });
  const result = dataExist ? (
    <ResultPlan resultSchedule={resultSchedule} parentRef={parentRef} />
  ) : null;

  return <>{result}</>;
};

const ResultPlan = ({ resultSchedule, parentRef }) => {
  const [heightInPx, setHeightInPx] = useState();
  useEffect(() => {
    const parentElement = parentRef.current;
    if (parentElement) {
      const { offsetHeight } = parentElement;
      setHeightInPx((offsetHeight / 2) * resultSchedule.duration);
    }
  }, [parentRef]);
  // style
  const planStyle = `absolute top-0 flex w-4/5 items-center justify-start rounded-lg bg-[#9BE1FF]`;

  return (
    <div className={planStyle} style={{ height: heightInPx }}>
      <p className="relative">{resultSchedule.destination}</p>
    </div>
  );
};
