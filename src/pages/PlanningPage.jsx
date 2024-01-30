import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// recoil
import { useRecoilState } from "recoil";
import { planState, currDate } from "../lib/constants/plandata";
// date-fns
import { format } from "date-fns";
// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanBody from "../components/plan/PlanBody";
const PlanningPage = () => {
  const [data, setData] = useRecoilState(planState);
  const [date, setDate] = useRecoilState(currDate);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <PlanHeader />
      <PlanBody />
    </div>
  );
};

export default PlanningPage;
