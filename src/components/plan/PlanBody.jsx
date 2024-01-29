import React from "react";
// components
import PlanPlace from "./PlanPlace";
import PlanTimeTable from "./PlanTimeTable";
import PlanMap from "./PlanMap";
const PlanBody = ({ setUserInput, userInput }) => {
  return (
    <div className="flex h-[65%] w-[93%] items-center justify-center">
      <PlanPlace setUserInput={setUserInput} />
      <PlanTimeTable />
      <PlanMap userInput={userInput} />
    </div>
  );
};

export default PlanBody;
