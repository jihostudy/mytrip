import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
// react-dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// components
import PlanPlace from "./PlanPlace";
import PlanTimeTable from "./PlanTimeTable";
import PlanMap from "./PlanMap";
const PlanBody = ({ setUserInput, userInput }) => {
  //장소 추가
  function planHandler() {}
  return (
    <div className="relative flex h-[65%] w-[93%] items-center justify-center">
      <DndProvider backend={HTML5Backend}>
        <PlanPlace setUserInput={setUserInput} />
        <PlanTimeTable />
      </DndProvider>

      <PlanMap userInput={userInput} />
    </div>
  );
};

export default PlanBody;
