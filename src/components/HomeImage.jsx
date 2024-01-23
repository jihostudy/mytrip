import React, { useEffect, useState } from "react";

const HomeImage = (props) => {
  const img = props.img;
  return (
    <li className="flex w-1/6 items-center overflow-hidden">
      <img
        src={img}
        alt="관광이미지"
        className="relative h-full w-full  object-cover hover:scale-110"
        onMouseEnter={props.onHover}
        onMouseLeave={props.onHover}
      />
    </li>
  );
};

export default HomeImage;
