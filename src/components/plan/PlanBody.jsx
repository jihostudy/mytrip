import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
// react-dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// components
import PlanPlace from "./Place/PlanPlace";
import PlanTimeTable from "./TimeTable/PlanTimeTable";
import PlanMap from "./Map/PlanMap";
const PlanBody = ({ setUserInput, userInput }) => {
  return (
    <div className="relative flex h-[65%] w-[93%] items-start justify-between">
      <DndProvider backend={HTML5Backend}>
        <PlanPlace setUserInput={setUserInput} userInput={userInput} />
        <PlanTimeTable />
      </DndProvider>

      <PlanMap userInput={userInput} />
    </div>
  );
};

export default PlanBody;
