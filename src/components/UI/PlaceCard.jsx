import React, { useEffect } from "react";
// recoil
import {
  planState,
  currDate,
  calculateEndTime,
} from "../../lib/constants/plandata";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
// react-dnd
import { useDrag } from "react-dnd";
// icon
import savingBtn from "../../assets/icons/savingBtn.png";
import savedBtn from "../../assets/icons/savedBtn.png";

const PlaceCard = ({ placeData, saveClickHandler }) => {
  const [data, setData] = useRecoilState(planState);
  const date = useRecoilValue(currDate);

  const image = placeData.image;
  const name = placeData.name;
  const address = placeData.address;
  const isSave = placeData.isSave;
  const destination = placeData.destination;
  const activity = placeData.activity;
  // 검사 함수
  function checkDuplicate(dropSource) {
    return data.schedule.some(
      (schedule) =>
        schedule.startTime.hour === dropSource.startTime.hour &&
        schedule.startTime.minute === dropSource.startTime.minute,
    );
  }
  function clickHandler() {
    // 저장 여부 변경
    saveClickHandler(placeData);
    console.log("보관함 클릭!");
  }
  const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      // drag할 요소의 type을 지정
      type: "PLACECARD",

      item: { destination, activity, nDay: date.currDate },
      // collect 옵션을 넣지 않으면 dragging 중일 때 opacity가 적용되지 않는다!
      collect: (monitor) => ({
        // isDragging 변수가 현재 드래깅중인지 아닌지를 true/false로 리턴한다
        isDragging: monitor.isDragging(),
      }),
      // item: droppable의 drop에서 return한 객체
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          const dropSource = monitor.getDropResult();
          console.log(dropSource);
          // 계획 추가
          const checkDuplicateTime = checkDuplicate(dropSource);

          console.log(checkDuplicateTime);
          if (!checkDuplicateTime) {
            const newData = {
              destination: null,
              activity: null,
              nDay: date,
              startTime: dropSource.startTime,
              endTime: calculateEndTime(dropSource.startTime, 2),
            };
            setData((prev) => ({
              ...prev,
              schedule: [...prev.schedule, newData],
            }));
          }

          // 초기화
        }
      },
    }),
    [data, placeData],
  );

  return (
    <li
      className="flex h-[18%] justify-between gap-4 bg-slate-100 p-3"
      ref={dragRef}
      style={{ opacity: isDragging ? "0.3" : "1" }}
    >
      <img src={image} alt="장소 사진" />

      <div className="grow">
        <p>{name}</p>
        <p>{address}</p>
        <p>평점 5</p>
      </div>
      {/* 보관 버튼 */}
      {!isSave ? (
        <img
          src={savingBtn}
          onClick={clickHandler}
          alt="보관"
          className="h-[60%] hover:cursor-pointer"
        />
      ) : (
        <img
          src={savedBtn}
          onClick={clickHandler}
          alt="보관"
          className="h-[60%] hover:cursor-pointer"
        />
      )}
    </li>
  );
};

export default PlaceCard;