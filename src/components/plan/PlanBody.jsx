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
  const [isShrink, setIsShrink] = useState(false);
  useEffect(() => {
    console.log(isShrink);
  }, [isShrink]);
  function handleShrink() {
    setIsShrink((prev) => !prev);
  }
  return (
    <div className="relative flex h-[77.4%] w-[93%] items-start">
      <DndProvider backend={HTML5Backend}>
        <PlanPlace setUserInput={setUserInput} userInput={userInput} />
        <PlanTimeTable
          classify="plan"
          isShrink={isShrink}
          handleShrink={handleShrink}
        />
      </DndProvider>

      <PlanMap userInput={userInput} isShrink={isShrink} />
    </div>
  );
};

export default PlanBody;
