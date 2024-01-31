import React, { useState } from "react";

// components
import PlaceCard from "../UI/PlaceCard";

// UI
import Button from "../UI/Button";

// Cataegory
const categoryList = ["추천 장소", "맛집", "카페", "숙소"];

const SelectPlace = ({ saveClickHandler, filteredList }) => {
  const [isClick, setIsClick] = useState(0);

  const categoryBtnStyle = "px-1";
  const categoryBtnStyle_clicked = "px-1 + bg-[#ffcb16]";

  function clickHandler(index) {
    // 클릭 시 색상 변경
    setIsClick(index);
    // 카테고리 기능 추가
  }

  return (
    <>
      {/* 카테고리 */}
      <div className="flex h-[8%] gap-3 pb-2">
        {categoryList.map((item, index) => {
          return (
            <Button
              txt={item}
              clickHandler={() => clickHandler(index)}
              custom={
                index === isClick ? categoryBtnStyle_clicked : categoryBtnStyle
              }
            />
          );
        })}
        {/* <Button txt="추천 장소" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="맛집" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="카페" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="숙소" clickHandler={clickHandler} custom={"px-1"} /> */}
      </div>
      {/* 장소 리스트 */}
      <ul className="flex h-[90%] flex-col gap-2 overflow-hidden overflow-y-auto">
        {filteredList.map((placeData, index) => (
          <PlaceCard
            key={index}
            placeData={placeData}
            saveClickHandler={saveClickHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default SelectPlace;
