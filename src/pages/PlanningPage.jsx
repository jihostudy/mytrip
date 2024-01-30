import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// recoil
import { useRecoilState } from "recoil";
import { planState, currDate } from "../lib/constants/plandata";
// date-fns
import { differenceInDays, format, parse } from "date-fns";
// router
import { useLocation } from "react-router-dom";

// Components
import PlanHeader from "../components/plan/PlanHeader";
import PlanBody from "../components/plan/PlanBody";

import { API } from "../api/API";

function getDateDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1; // 밀리세컨 * 초 * 분 * 시 = 일
}

const PlanningPage = () => {
  const [data, setData] = useRecoilState(planState);
  const [date, setDate] = useRecoilState(currDate);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(date);
  }, [date]);
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
  }, []);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <PlanHeader />
      <PlanBody setUserInput={setUserInput} userInput={userInput} />
    </div>
  );
};

export default PlanningPage;
