import React from "react";

// components
import KakaoMap from "./KakaoMap";

const PlanMap = ({ userInput }) => {
  return (
    <div className="h-full w-[37%] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <KakaoMap userInput={userInput} />
    </div>
  );
};

export default PlanMap;
