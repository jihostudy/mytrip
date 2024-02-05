import React from "react";
// date-fns
import { format, getMinutes, getHours } from "date-fns";
// Components
import TimeFraction from "./TimeFraction";
const TimeLine = ({ hour, isMain }) => {
  const minuteArr = [0, 30];
  // ["04:00","04:30"] 형식으로 들어있음
  const formattedTime = minuteArr.map((minute) => {
    let time = new Date();
    time.setHours(hour, minute, 0, 0);
    return time;
  });
  return (
    <li className="relative flex min-h-[8.7dvh] w-full flex-col items-center justify-evenly border-b-1 border-solid border-[#CBC8C8]">
      <div className="absolute left-[2%] w-[16%]">
        {format(formattedTime[0], "HH:mm")}
      </div>
      {formattedTime.map((time) => {
        return (
          <TimeFraction
            key={time}
            hour={getHours(time)} // 숫자
            minute={getMinutes(time)} // 숫자
            isMain={isMain}
          />
        );
      })}
    </li>
  );
};

export default TimeLine;
