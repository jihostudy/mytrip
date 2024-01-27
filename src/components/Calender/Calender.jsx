import React, { useEffect, useState } from "react";

// date-fns
import { addMonths, subMonths, isAfter } from "date-fns";
// components
import CalenderHeader from "./CalenderHeader";
import CalenderBody from "./CalenderBody";

const Calender = (props) => {
  const [currentDate, setCurrentDate] = useState(props.date);

  // functions
  function onSelectMonth(value) {
    if (value === "prev") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (value === "next") {
      setCurrentDate(addMonths(currentDate, 1));
    }
  }
  function onDateClick(isAble, day) {
    if (isAble != "disable") props.onDateClick(day);
  }

  return (
    <div className="flex h-full w-[45%] flex-col items-center">
      <CalenderHeader currentDate={currentDate} onSelectMonth={onSelectMonth} />
      <CalenderBody
        currentDate={currentDate}
        schedule={props.schedule}
        onDateClick={onDateClick}
        tempDate={props.tempDate}
        onHoverHandler={props.onHoverHandler}
      />
    </div>
  );
};

export default Calender;
