import React from "react";

// components
import PlaceCard from "../UI/PlaceCard";

const SelectPlace = ({ saveClickHandler, filteredList }) => {
  const categoryBtnStyle = "";
  const categoryBtnStyle_clicked = "";

  return (
    <>
      {/* 카테고리 */}
      <div className="flex h-[8%] gap-3 pb-4">
        <button>추천 장소</button>
        <button>맛집</button>
        <button>카페</button>
        <button>숙소</button>
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
