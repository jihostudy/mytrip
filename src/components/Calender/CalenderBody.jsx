import React from "react";
// date-fns
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  subDays,
  isWithinInterval,
} from "date-fns";
import {
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isSaturday,
  isSunday,
} from "date-fns";
// CSS
import classes from "./CalenderBody.module.css";
const CalenderBody = ({ currentDate, schedule, onDateClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  const today = new Date();

  let formattedDate;
  // Styles
  let isAble = null;
  let t_bold = null;

  const past = "flex justify-center items-center w-full h-full invisible";
  const saturday =
    "flex justify-center items-center w-full h-full text-[#006f80] hover:bg-[#38c3ff] hover:rounded-lg";
  const sunday =
    "flex justify-center items-center w-full h-full text-[#e53e30] hover:bg-[#38c3ff] hover:rounded-lg";
  const regular =
    "flex justify-center items-center w-full h-full hover:bg-[#38c3ff] hover:rounded-lg";
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      isAble = null;

      if (!isSameMonth(day, monthStart) || isBefore(day, subDays(today, 1))) {
        isAble = "disable";
      }
      //able
      //start
      else if (schedule.start && isSameDay(day, schedule.start)) {
        if (!schedule.end) isAble = "day_trip";
        else isAble = "start";
      }
      //end
      else if (schedule.end) {
        if (
          isAfter(day, schedule.start) &&
          isBefore(day, schedule.end) &&
          isSameMonth(day, monthStart)
        )
          isAble = "middle";
        else if (isSameDay(day, schedule.end) && isSameMonth(day, monthStart))
          isAble = "end";
      }

      // 오늘?
      isSameDay(day, today) ? (t_bold = "t_bold") : (t_bold = null);
      // 이렇게 하지 않으면 마지막 isAble이 모두 할당됨
      const cloneDay = day;
      const cloneIsAble = isAble;
      days.push(
        <div
          className={[
            "relative flex w-[14.28%] items-center justify-center",
            classes[isAble],
            classes[t_bold],
          ].join(" ")}
          key={day}
          onClick={() => onDateClick(cloneIsAble, cloneDay)}
        >
          <span
            className={
              !isSameMonth(day, monthStart) || isBefore(day, subDays(today, 1))
                ? past
                : isSaturday(day)
                  ? saturday
                  : isSunday(day)
                    ? sunday
                    : regular
            }
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex h-1/5 justify-evenly rounded-md" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="h-[60%] w-full">{rows}</div>;
};

export default CalenderBody;
