import React from "react";

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanPlace from "../components/plan/PlanPlace";
import PlanTimeTable from "../components/plan/PlanTimeTable";
import PlanMap from "../components/plan/PlanMap";

const PlanningPage = () => {
  return (
    <div className="absolute top-[15%] flex h-full w-full flex-col">
      <div className="h-[10%]">
        <PlanHeader />
      </div>

      <div className="flex h-[65%] w-full items-center justify-center">
        <PlanPlace />
        <PlanTimeTable />
        <PlanMap />
      </div>
    </div>
  );
};

export default PlanningPage;
