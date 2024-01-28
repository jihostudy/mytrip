import React, { useEffect, useState } from "react";

// router
import { useLocation } from "react-router-dom";

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanPlace from "../components/plan/PlanPlace";
import PlanTimeTable from "../components/plan/PlanTimeTable";
import PlanMap from "../components/plan/PlanMap";

// axios
import { API } from "../api/API";

const PlanningPage = () => {
  // 처음 설정한 지역으로 초기화
  const { state } = useLocation();
  const [userInput, setUserInput] = useState();
  console.log(userInput);

  useEffect(() => {
    if (state) {
      setUserInput(state.region);
    }
  }, []);

  useEffect(() => {
    async function place() {
      try {
        const res = API.get(`/planning/data/Seoul`);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    place();
  });

  return (
    <div className="absolute top-[15%] flex h-full w-full flex-col">
      <div className="h-[10%]">
        <PlanHeader />
      </div>

      <div className="flex h-[65%] w-full items-center justify-center">
        <PlanPlace setUserInput={setUserInput} />
        <PlanTimeTable />
        <PlanMap userInput={userInput} />
      </div>
    </div>
  );
};

export default PlanningPage;
