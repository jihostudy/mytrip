import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { planState } from "../../lib/constants/plandata";
// react-dnd
import { useDrop } from "react-dnd";

const TimeLine = ({ hour }) => {
  const minuteArr = ["00", "30"];

  return (
    <li className="relative flex min-h-[16.66%] w-full flex-col items-center justify-evenly border-b-1 border-solid border-[#CBC8C8]">
      <div className="absolute left-0 w-[16%]">{hour}</div>

      {minuteArr.map((minute) => {
        return <TimeFraction key={minute} hour={hour} minute={minute} />;
      })}
    </li>
  );
};

export default TimeLine;

const TimeFraction = ({ hour, minute, showPreview }) => {
  const [data, setData] = useRecoilState(planState);

  // preview
  const [isOver, setIsOver] = useState(false);
  const previeStyle =
    minute === "00"
      ? "absolute top-[5%] h-[90%] w-[70%] rounded-md bg-[#9BE1FF]"
      : "absolute top-[55%] h-[90%] w-[70%] rounded-md bg-[#9BE1FF]";
  const preview = <p className={previeStyle}>여행지</p>;

  // Data 표시
  const dataExist = data.schedule.some(
    (schedule) =>
      schedule.startTime.hour === hour && schedule.startTime.minute === minute,
  );
  const resultStyle =
    minute === "00"
      ? "absolute top-[5%] h-[90%] w-[70%] rounded-md bg-red-100"
      : "absolute top-[55%] h-[90%] w-[70%] rounded-md bg-red-100";
  const result = <p className={resultStyle}>여행지</p>;
  const [, dropRef] = useDrop(
    () => ({
      accept: "PLACECARD",
      // item : 드래그 drop한 item
      drop: (item, monitor) => {
        console.log("item");
        console.log(item);
        return {
          startTime: {
            hour: hour,
            minute: minute,
          },
        };
      },
    }),
    [],
  );

  return (
    <>
      <div
        className="z-10 flex h-1/2 w-full justify-center border-1 border-solid border-black"
        // style={{ top: top }}
        ref={dropRef}
        onDragEnter={() => setIsOver(true)}
        onDragLeave={() => setIsOver(false)}
        onMouseLeave={() => setIsOver(false)}
      ></div>
      {isOver && preview}
      {dataExist && result}
    </>
  );
};

const SubPlan = () => {};
