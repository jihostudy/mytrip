import React from "react";
// components
import PlanResultHeader from "../components/plan/Result/PlanResultHeader";
// recoil
import { planState } from "../lib/constants/plandata";
import { useRecoilValue } from "recoil";
import PlanResultTimeTable from "../components/plan/Result/PlanResultTimeTable";
const PlanResultPage = () => {
  const data = useRecoilValue(planState);
  let groupedByNday = Array.from({ length: data.period }, () => []);
  data.schedule.forEach((schedule) => {
    const nDayValue = schedule.nDay;
    groupedByNday[nDayValue - 1].push(schedule);
  });
  console.log(groupedByNday);
  const resultData = groupedByNday.map((daySchedule, index) => {
    console.log(index);
    return (
      <PlanResultTimeTable
        key={index}
        schedule={daySchedule}
        nDay={index + 1}
      />
    );
  });
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <PlanResultHeader />
      <div className="relative flex h-[65%] w-[93%] items-center justify-start overflow-hidden overflow-x-auto shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        {resultData}
      </div>
    </div>
  );
};

export default PlanResultPage;
