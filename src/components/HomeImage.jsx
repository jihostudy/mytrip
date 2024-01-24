import React, { useEffect, useState } from "react";

const HomeImage = (props) => {
  const img = props.img;
  return (
    <li className="flex w-1/6 flex-col items-center overflow-hidden hover:origin-bottom hover:scale-110">
      <img
        src={img}
        alt="관광이미지"
        className="relative h-full w-full rounded-lg object-cover"
        onMouseEnter={props.onHover}
        onMouseLeave={props.onHover}
      />
      <p className="pt-4 font-semibold">서울 여행</p>
    </li>
  );
};

export default HomeImage;
