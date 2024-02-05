import React, { useCallback, useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import {
  planState,
  currDate,
  loadedPlanState,
  loadedCurrDate,
  setEndTime,
} from "../../../lib/constants/plandata";
// date-fns
import { format, getMinutes, getHours } from "date-fns";
// react-dnd
import { useDrag, useDrop } from "react-dnd";
// re-resize
import { Resizable } from "re-resizable";
const TimeFraction = ({ hour, minute, isMain }) => {
  const [data, setData] = isMain
    ? useRecoilState(planState)
    : useRecoilState(loadedPlanState);
  const [date, setDate] = isMain
    ? useRecoilState(currDate)
    : useRecoilState(loadedCurrDate);

  // preview
  const [isOver, setIsOver] = useState(false);
  const previewStyle =
    minute === 0
      ? "absolute top-[5%] right-[5%] h-[90%] w-[80%] rounded-md bg-[#9BE1FF] scale-105"
      : "absolute top-[55%] right-[5%] h-[90%] w-[80%] rounded-md bg-[#9BE1FF] scale-105";
  const preview = <p className={previewStyle} />;
  // Data가 Fraction에 있는지 검사

  let resultSchedule;
  const dataExist = data.schedule.some((schedule) => {
    const isMatching =
      schedule.startTime.hour === hour &&
      schedule.startTime.minute === minute &&
      schedule.nDay === date.currDate;

    if (isMatching) {
      resultSchedule = schedule;
    }

    return isMatching;
  });
  const result = dataExist ? (
    <Plan resultSchedule={resultSchedule} isMain={isMain} />
  ) : null;
  // const result = dataExist ? (
  //   <Plan destination={resultDestination} hour={hour} minute={minute} />
  // ) : null;
  // #1. Drop
  const [, dropRef] = useDrop(
    () => ({
      accept: "PLACECARD",
      // item : drop한 item
      drop: (item, monitor) => {
        // #1-1. "장소 선택"에서 장소를 drop
        if (item.value === "place") {
          setIsOver(false);
          return {
            startTime: {
              hour: hour,
              minute: minute,
            },
          };
        } else if (item.value === "plan") {
          // #1-2. "여행 시간표"에서 위치 이동한 경우
          console.log(item);
          const modifiedSchedule = data.schedule.map((schedule) => {
            if (
              schedule.startTime.hour === item.startTime.hour &&
              schedule.startTime.minute === item.startTime.minute
            ) {
              const newStartTime = { hour, minute }; //drop을 감지한 컴포넌트
              return {
                ...schedule,
                nDay: date.currDate,
                startTime: newStartTime,
                endTime: setEndTime(newStartTime, 2),
              };
            }
            return schedule;
          });
          setData((prev) => ({
            ...prev,
            schedule: modifiedSchedule,
          }));
          setIsOver(false);
        }
        //#1-3. "여행지 불러오기" 에서 가져온 경우
        else if (item.value === "load") {
          // 새로운 시간 추가해주기
          const newSchedule = {
            ...item.schedule,
            startTime: { hour, minute },
            endTime: setEndTime({ hour, minute }, item.schedule.duration),
          };
          setData((prev) => ({
            ...prev,
            schedule: [...prev.schedule, newSchedule],
          }));
          setIsOver(false);
        }
      },
    }),
    [isOver, data],
  );

  return (
    <>
      <div
        className="z-10 flex h-1/2 w-full justify-center"
        // style={{ top: top }}
        id="dropFraction"
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(false);
        }}
        onDragEnd={() => setIsOver(false)}
        // onMouseLeave={() => setIsOver(false)}
      />
      {isOver && preview}
      {!isOver && result}
    </>
  );
};
export default TimeFraction;
// ------------------------------------------Component------------------------------------------
const Plan = ({ resultSchedule, isMain }) => {
  console.log(resultSchedule);
  const [data, setData] = isMain
    ? useRecoilState(planState)
    : useRecoilState(loadedPlanState);

  // resize 제한
  const restrictElement = document.getElementById("dropContainer");
  // resize 높이 지정하기
  let parentWidth;
  let parentHeight;
  const parentElement = document.getElementById("dropFraction");
  if (parentElement) {
    const { offsetWidth, offsetHeight } = parentElement;
    parentWidth = offsetWidth;
    parentHeight = offsetHeight; // 1duration height = parentHeight
  }
  // endTime 바꿔주기
  function resizeStopHandler(e, direction, ref, d) {
    // d :{width:변한 width, height: 변한 height}
    // 칸수 계산하기 -> duration 변환
    const duration = 2 + parseInt(d.height / parentHeight);

    const modifiedSchedule = data.schedule.map((schedule) => {
      if (schedule.startTime === resultSchedule.startTime) {
        return {
          ...schedule,
          endTime: setEndTime(resultSchedule.startTime, duration),
          duration,
        };
      }
      return schedule;
    });
    setData((prev) => ({
      ...prev,
      schedule: modifiedSchedule,
    }));
  }

  // Drag
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: "PLACECARD",
      item: isMain
        ? {
            value: "plan",
            startTime: resultSchedule.startTime,
          }
        : {
            value: "load",
            // schedule: resultSchedule,
            schedule: resultSchedule,
          },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );
  //style
  const resultStyle =
    "relative h-full w-full rounded-lg bg-[#9BE1FF] flex items-center";

  return (
    <Resizable
      defaultSize={{
        width: "80%",
        height: resultSchedule.duration * parentHeight,
      }}
      grid={[parentHeight, parentHeight]}
      // grid={[100, 10]}
      enable={{
        top: false,
        right: false,
        left: false,
        bottom: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      boundsByDirection={true}
      maxWidth={(parentWidth * 8) / 10}
      minHeight={parentHeight * 2}
      style={{
        position: "absolute",
        top: resultSchedule.startTime.minute === 0 ? "0%" : "50%",
        // margin: "2% 0 0 0",
        right: "5%",
        zIndex: isDragging ? 0 : 20,
      }}
      bounds={restrictElement}
      onResizeStop={resizeStopHandler}
    >
      <div
        className={resultStyle}
        ref={dragRef}
        style={{
          opacity: isDragging ? "0.3" : "1",
        }}
      >
        <p className="relative">{resultSchedule.destination}</p>
      </div>
    </Resizable>
  );
};
