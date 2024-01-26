import React from "react";
import ReactDOM from "react-dom";
// router

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanBody from "../components/plan/PlanBody";
import Backdrop from "../components/common/Backdrop";
const PlanningPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      <PlanHeader />
      <PlanBody />
    </div>
  );
};

export default PlanningPage;
