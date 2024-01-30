import React, { useCallback, useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { planState, setEndTime } from "../../lib/constants/plandata";
// date-fns
import { format, getMinutes, getHours } from "date-fns";
// react-dnd
import { useDrag, useDrop } from "react-dnd";
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

  let resultDestination;
  const dataExist = data.schedule.some((schedule) => {
    const isMatching =
      schedule.startTime.hour === hour && schedule.startTime.minute === minute;

    if (isMatching) {
      resultDestination = schedule.destination;
    }

    return isMatching;
  });

  const result = dataExist ? (
    <Plan destination={resultDestination} hour={hour} minute={minute} />
  ) : null;
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
          console.log("plan drag");
          // item.hour : 기존 몇시
          // item.minute : 기존 몇분
          console.log(item.hour, item.minute);
          // 해당 시간을 찾아서, 바꿔껴주기
          const modifiedSchedule = data.schedule.map((schedule) => {
            if (
              schedule.startTime.hour === item.hour &&
              schedule.startTime.minute === item.minute
            ) {
              const newStartTime = { hour, minute };
              return {
                ...schedule,
                startTime: newStartTime,
                endTime: setEndTime(newStartTime, 2),
              };
            }
          });
          console.log(modifiedSchedule);
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
        id="dropFraciton"
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

const Plan = ({ destination, hour, minute }) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: "PLACECARD",
      item: { value: "plan", hour, minute },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // item: droppable의 drop에서 return한 객체
      //   end: (item, monitor) => {
      //     const didDrop = monitor.didDrop();
      //     if (didDrop) {
      //       const dropSource = monitor.getDropResult();
      //       console.log(dropSource);
      //       // 계획 추가
      //       const checkDuplicateTime = checkDuplicate(dropSource);

      //       console.log(checkDuplicateTime);
      //       if (!checkDuplicateTime) {
      //         const newData = {
      //           destination: name,
      //           destinationID: null,
      //           activity: null,
      //           nDay: date,
      //           startTime: dropSource.startTime,
      //           endTime: setEndTime(dropSource.startTime, 2),
      //         };
      //         setData((prev) => ({
      //           ...prev,
      //           schedule: [...prev.schedule, newData],
      //         }));
      //       }

      //       // 초기화
      //     }
      //   },
    }),
    [],
    // [data, placeData],
  );
  //style
  const resultStyle =
    minute === 0
      ? "z-20 absolute top-[5%] h-[90%] w-[70%] rounded-md bg-red-100"
      : "z-20 absolute top-[55%] h-[90%] w-[70%] rounded-md bg-red-100";
  return (
    <div
      className={resultStyle}
      ref={dragRef}
      style={{ opacity: isDragging ? "0.3" : "1" }}
    >
      {destination}
    </div>
  );
};
