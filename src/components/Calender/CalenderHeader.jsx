import React from "react";
// date-fns
import { format } from "date-fns";
// react-icons
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const CalenderHeader = ({ currentDate, onSelectMonth }) => {
  const days = [];
  const dates = ["일", "월", "화", "수", "목", "금", "토"];
  dates.map((date) => {
    days.push(
      <div
        key={date}
        className="flex h-full w-[14.28%] items-center justify-center"
      >
        {date}
      </div>,
    );
  });
  return (
    <>
      <div className="flex h-[30%] w-full items-center justify-between font-bold">
        <FaAngleLeft
          onClick={() => onSelectMonth("prev")}
          style={{ marginLeft: "3%" }}
        />
        <div>
          {format(currentDate, "yyyy")}년 {format(currentDate, "M")}월
        </div>
        <FaAngleRight
          onClick={() => onSelectMonth("next")}
          style={{ marginRight: "3%" }}
        />
      </div>
      <div className="flex h-[10%] w-full items-center justify-evenly">
        {days}
      </div>
    </>
  );
};

export default CalenderHeader;
