import React from "react";

// components
import KakaoMap from "./KakaoMap";

const PlanMap = ({ userInput }) => {
  return (
    <div className="h-full w-[32%] border border-solid border-black">
      <KakaoMap userInput={userInput} />
    </div>
  );
};

export default PlanMap;
