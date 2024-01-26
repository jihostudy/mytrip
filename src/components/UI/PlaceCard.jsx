import React from "react";

// icon
import saveBtn from "../../assets/icons/saveBtn.png";

const PlaceCard = ({ data }) => {
  const image = data.image;
  const name = data.name;
  const address = data.address;
  const isSave = data.isSave;

  return (
    <li className="flex h-[18%] justify-between gap-4 bg-slate-100 p-3">
      {/* 이미지 */}
      <img src="image" alt="장소 사진" />
      {/* 이름, 주소, 평점?? */}
      <div className="grow">
        <p>{name}</p>
        <p>{address}</p>
        <p>평점??</p>
      </div>
      {/* 보관 버튼 */}
      <img src={saveBtn} alt="보관" className="h-[60%] " />
    </li>
  );
};

export default PlaceCard;
