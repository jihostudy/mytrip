import React, { useCallback, useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { planState, setEndTime } from "../../lib/constants/plandata";
// date-fns
import { format, getMinutes, getHours } from "date-fns";
// react-dnd
import { useDrag, useDrop } from "react-dnd";
// re-resize
import { Resizable } from "re-resizable";
const TimeFraction = ({ hour, minute }) => {
  const [data, setData] = useRecoilState(planState);

  // preview
  const [isOver, setIsOver] = useState(false);
  const previewStyle =
    minute === 0
      ? "absolute top-[5%] h-[90%] w-[70%] rounded-md bg-[#9BE1FF]"
      : "absolute top-[55%] h-[90%] w-[70%] rounded-md bg-[#9BE1FF]";
  const preview = <p className={previewStyle} />;
  // Data가 Fraction에 있는지 검사

  let resultSchedule;
  const dataExist = data.schedule.some((schedule) => {
    const isMatching =
      schedule.startTime.hour === hour && schedule.startTime.minute === minute;

    // if (isMatching) {
    //   resultDestination = schedule.destination;
    // }
    if (isMatching) {
      resultSchedule = schedule;
    }

    return isMatching;
  });
  const result = dataExist ? <Plan resultSchedule={resultSchedule} /> : null;
  // const result = dataExist ? (
  //   <Plan destination={resultDestination} hour={hour} minute={minute} />
  // ) : null;
  const [, dropRef] = useDrop(
    () => ({
      accept: "PLACECARD",
      // item : 드래그 drop한 item
      drop: (item, monitor) => {
        if (item.value === "place") {
          setIsOver(false);
          return {
            startTime: {
              hour: hour,
              minute: minute,
            },
          };
        } else if (item.value === "plan") {
          // 기존 시작시간 찾아서, 바꿔껴주기
          // item.startTime.hour
          // item.startTime.minute
          const modifiedSchedule = data.schedule.map((schedule) => {
            if (
              schedule.startTime.hour === item.startTime.hour &&
              schedule.startTime.minute === item.startTime.minute
            ) {
              const newStartTime = { hour, minute }; //drop을 감지한 컴포넌트
              return {
                ...schedule,
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

          // 어디에 놨는지를 리턴에 넣어서 drag에 줌 -> data.scheudle을 바꿔야함
          return;
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
          // console.log(e.target);
          e.preventDefault();
          e.stopPropagation();
          setIsOver(true);
        }}
        onDragLeave={(e) => {
          // console.log(e.target);
          e.preventDefault();
          e.stopPropagation();
          setIsOver(false);
        }}
        // onMouseLeave={() => setIsOver(false)}
      />
      {isOver && preview}
      {!isOver && result}
    </>
  );
};
export default TimeFraction;
// ------------------------------------------Component------------------------------------------
const Plan = ({ resultSchedule }) => {
  const [data, setData] = useRecoilState(planState);

  // resize 제한
  const restrictElement = document.getElementById("dropContainer");
  // resize 높이 지정하기
  let parentWidth;
  let parentHeight;
  const parentElement = document.getElementById("dropFraction");
  if (parentElement) {
    const { offsetWidth, offsetHeight } = parentElement;
    parentWidth = offsetWidth;
    parentHeight = offsetHeight;
  }
  // endTime 바꿔주기
  function resizeStopHandler(e, direction, ref, d) {
    // d :{width:변한 width, height: 변한 height}
    // 칸수 계산하기 -> duration 변환
    const duration = 2 + parseInt(d.height / parentHeight);
    console.log(duration);
    const modifiedSchedule = data.schedule.map((schedule) => {
      if (schedule.startTime === resultSchedule.startTime) {
        console.log(resultSchedule.startTime);
        console.log(setEndTime(resultSchedule.startTime, duration));
        return {
          ...schedule,
          endTime: setEndTime(resultSchedule.startTime, duration),
        };
      }
      return schedule;
    });
    console.log(modifiedSchedule);
    setData((prev) => ({
      ...prev,
      schedule: modifiedSchedule,
    }));
  }

  // Drag
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: "PLACECARD",
      item: {
        value: "plan",
        startTime: resultSchedule.startTime,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );
  //style
  const resultStyle = "relative h-full w-full rounded-md bg-red-100";

  return (
    <Resizable
      defaultSize={{ width: "70%", height: "100%" }}
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
      maxWidth={(parentWidth * 7) / 10}
      minHeight={parentHeight * 2}
      style={{
        position: "absolute",
        top: resultSchedule.startTime.minute === 0 ? 0 : "50%",
        padding: "0.5% 0",
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
        {resultSchedule.destination}
      </div>
    </Resizable>
  );
};
