import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
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
  const [data, setData] = useState({
    id: null,
    username: null,
    region: null,
    date: { start: null, end: null }, // 시작-끝 날짜
    period: null, //몇일?
    season: null,
    totalCost: null,
    likes: null,
    scraps: null,
    image: null,
    shareURI: null,
    description: null,
    isPublic: null,
    hashTag: [],
    schedule: [], // 방문 장소들
  });

  // 시간 입력
  function dateHandler(schedule) {
    if (schedule === "reset") {
      setData((prev) => ({
        ...prev,
        date: {
          start: null,
          end: null,
        },
        period: null,
      }));
      return;
    }
    let start = format(schedule.start, "yyyy.MM.dd");
    let end;
    let period;
    // 당일치기
    if (!schedule.end) {
      end = start;
    } else {
      end = format(schedule.end, "yyyy.MM.dd");
    }
    period = getDateDiff(start, end);

    setData((prev) => ({
      ...prev,
      date: {
        start: start,
        end: end,
      },
      period: period,
    }));
  }

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
    <div className="relative flex h-full w-full flex-col items-center justify-start">
      <PlanHeader data={data} dateHandler={dateHandler} />
      <PlanBody data={data} setUserInput={setUserInput} userInput={userInput} />
    </div>
  );
};

export default PlanningPage;
