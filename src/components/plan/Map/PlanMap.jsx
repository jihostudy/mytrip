import React from "react";

// components
import KakaoMap from "./KakaoMap";

const PlanMap = ({ userInput, isShrink }) => {
  const mapStyle = !isShrink
    ? "h-full w-[37%] shadow-[0_0_4px_rgba(0,0,0,0.25)] duration-700 origin-left"
    : "h-full w-[52%] shadow-[0_0_4px_rgba(0,0,0,0.25)]";
  return (
    <div className={mapStyle}>
      <KakaoMap userInput={userInput} />
    </div>
  );
};

export default PlanMap;
