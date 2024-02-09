import React, { useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import {
  planState,
  currDate,
  defaultPlanState,
} from "../lib/constants/plandata";
// router
import { useLocation } from "react-router-dom";

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanBody from "../components/plan/PlanBody";

import { API } from "../api/API";

const PlanningPage = () => {
  const [data, setData] = useRecoilState(planState);
  useEffect(() => {
    console.log(data);
  }, [data]);
  // #0. region 저장
  const { state } = useLocation();
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    if (state) {
      setUserInput(state.region);
      setData((prev) => ({
        ...prev,
        region: state.region,
      }));
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
  }, []);
  return (
    <div className="relative flex h-[87.2dvh] w-full flex-col items-center justify-start">
      <PlanHeader />
      <PlanBody userInput={userInput} setUserInput={setUserInput} />
    </div>
  );
};

export default PlanningPage;
