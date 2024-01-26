import React from "react";
// date-fns
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  getDate,
} from "date-fns";
import { isSameMonth, isSameDay } from "date-fns";
const CalenderBody = ({ currentDate, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  const today = new Date();

  let formattedDate;

  // styles
  const disabled = "flex w-[14.28%] items-center justify-center text-[#E0E0E0]";
  const selected = "flex w-[14.28%] items-center justify-center text-blue-600";
  const regular = "flex w-[14.28%] items-center justify-center";
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={
            !isSameMonth(day, monthStart)
              ? disabled
              : isSameDay(day, selectedDate) &&
                  isSameMonth(new Date(), selectedDate)
                ? selected
                : regular
          }
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span
          // className={
          //   format(currentDate, "M") !== format(day, "M")
          //     ? "text not-valid"
          //     : ""
          // }
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex h-1/5 justify-evenly" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="h-[60%] w-full">{rows}</div>;
};

export default CalenderBody;
