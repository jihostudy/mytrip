import React from "react";
// Components
import Calender from "./Calender";
import Button from "../UI/Button";
const CalenderContainer = () => {
  const date = new Date();
  function addMonth(currDate) {
    return new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      currDate.getDate(),
    );
  }
  return (
    <>
      <div className="absolute top-[120%] flex h-[550%] w-[502%] flex-col items-center justify-around rounded-xl border-[1px] border-solid border-black bg-white">
        <div className="flex h-[70%] w-[90%] justify-between text-sm">
          <Calender date={date} />
          <Calender date={addMonth(date)} />
        </div>
        <div className="relative flex h-[25%] w-[90%] items-center justify-center border-t-2 border-solid border-black">
          <p className="flex h-[50%] w-[82%] items-center justify-center text-lg font-bold">
            01.22 월 - 01.23 화 (1박)
          </p>
          <button className="absolute right-0 h-1/2 w-[15%] rounded-md bg-[#38C3FF]">
            완료
          </button>
        </div>
      </div>
    </>
  );
};

export default CalenderContainer;
