import React from "react";

// icon
import savingBtn from "../../assets/icons/savingBtn.png";
import savedBtn from "../../assets/icons/savedBtn.png";

const PlaceCard = ({ place, saveClickHandler }) => {
  const image = place.image;
  const name = place.name;
  const address = place.address;
  const isSave = place.isSave;

  function clickHandler() {
    // 저장 여부 변경
    saveClickHandler(place);
    console.log("보관함 클릭!");
  }

  return (
    <li className="flex h-[20%] justify-between gap-4 bg-slate-100 p-3">
      {/* 이미지 */}
      <img src={image} alt="장소 사진" />
      {/* 이름, 주소, 평점?? */}
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
