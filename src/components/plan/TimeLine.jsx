import React, { useEffect, useState } from "react";
// recoil
import { dndHoverState } from "../../lib/constants/dnd";
import { useRecoilState } from "recoil";
// react-dnd
import { useDrop } from "react-dnd";

const TimeFraction = ({ hour, minute, showPreview }) => {
  const [dndHoverInfo, setDndHoverInfo] = useRecoilState(dndHoverState);
  const top = minute === 0 ? 0 : "50%";
  const preview = (
    <p className="h-[200%] w-1/2 rounded-md bg-[#9BE1FF]">hover됨</p>
  );
  const [, dropRef] = useDrop(
    () => ({
      accept: "PLACECARD",
      // drop:(item) => ondrop(),
      // canDrop: () => false,
      hover({ name: username }, monitor) {
        const isOver = monitor.isOver();
        if (isOver) {
          setDndHoverInfo({
            hour,
            minute,
          });
        }
      },
    }),
    [],
  );

  return (
    <div
      className="absolute flex h-1/2 w-full justify-center border-1 border-solid border-black"
      style={{ top: top }}
      ref={dropRef}
    >
      {/* {top} */}
      {showPreview && preview}
    </div>
  );
};

const TimeLine = ({ hour }) => {
  const [dndHoverInfo, setDndHoverInfo] = useRecoilState(dndHoverState);
  const minuteArr = [0, 30];

  // function handleHover(fraction) {
  //   onHover(time, fraction);
  // }

  return (
    <li className="relative flex  min-h-[12.5%] w-full flex-col items-center justify-center border-b-1 border-solid border-[#CBC8C8]">
      <div className="absolute left-0">{hour}</div>

      {minuteArr.map((minute) => {
        const showPreview =
          dndHoverInfo.hour === hour && dndHoverInfo.minute === minute
            ? true
            : false;
        return (
          <TimeFraction
            key={minute}
            hour={hour}
            minute={minute}
            showPreview={showPreview}
            // handleHover={handleHover}
          />
        );
      })}
    </li>
  );
};

export default TimeLine;
