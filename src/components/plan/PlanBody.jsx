import React from "react";
// components
import PlanPlace from "./PlanPlace";
import PlanTimeTable from "./PlanTimeTable";
import PlanMap from "./PlanMap";
const PlanBody = () => {
  return (
    <div className="flex h-[65%] w-[93%] items-center justify-center">
      <PlanPlace />
      <PlanTimeTable />
      <PlanMap />
    </div>
  );
};

export default PlanBody;
