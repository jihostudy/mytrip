import React from "react";
// router

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanBody from "../components/plan/PlanBody";

const PlanningPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <PlanHeader />
      <PlanBody />
    </div>
  );
};

export default PlanningPage;
