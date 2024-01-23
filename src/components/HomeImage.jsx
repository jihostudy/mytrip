import React, { useEffect, useState } from "react";

const HomeImage = (props) => {
  const [hover, setHover] = useState(false);
  const img = props.img;
  const hoverHandler = () => {
    setHover((prev) => !prev);
  };
  return (
    <li className="flex w-1/6 items-center overflow-hidden">
      <img
        src={img}
        alt="관광이미지"
        className="relative h-full w-full  object-cover hover:scale-110"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      />
      {hover && <div className="absolute w-1/6 bg-gray-300" />}
    </li>
  );
};

export default HomeImage;
