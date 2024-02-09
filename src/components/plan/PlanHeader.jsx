import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// router
import { useNavigate, useLocation } from "react-router-dom";
// recoil
import { planState, currDate } from "../../lib/constants/plandata";
import { useRecoilState } from "recoil";
// components
import Button from "../UI/Button";
import CalenderContainer from "../Calender/CalenderContainer";
import { API } from "../../api/API";
const PlanHeader = (props) => {
  const [data, setData] = useRecoilState(planState);
  const [curDate, setCurDate] = useRecoilState(currDate);

  const location = useLocation();
  const navigate = useNavigate();
  const region = location.state.region.slice(0, 2);

  const { date } = data;
  let planPeriod;
  if (!date.start) {
    planPeriod = "날짜를 입력해주세요";
  } else {
    // 당일치기
    // console.log(date);
    if (date.start === date.end) planPeriod = date.start;
    else planPeriod = date.start + " ~ " + date.end;
  }
  const [modalVisible, setModalVisible] = useState(false);
  //-----------------------------------------------------Functions-----------------------------------------------------
  // 초기화

  function resetDate() {
    setData((prev) => ({
      ...prev,
      date: {
        start: null,
        end: null,
      },
      period: null,
    }));
  }
  // 저장
  async function saveHandler() {
    // season 계산
    const month = parseInt(data.date.start.split(".")[1]);
    let season;

    switch (month) {
      case 11:
      case 12:
      case 1:
      case 2:
        season = "겨울";
        break;
      case 3:
      case 4:
      case 5:
        season = "봄";
        break;
      case 6:
      case 7:
      case 8:
        season = "여름";
        break;
      case 9:
      case 10:
        season = "가을";
        break;
      default:
        break;
    }
    const planData = {
      _id: data.id,
      name: data.title,
      city: data.region,
      date: data.date,
      period: data.period,
      season: season,
      totalCost: data.totalCost,
      numPeople: data.numPeople,
      likes: data.likes,
      scraps: data.scraps,
      image: data.image,
      shareUri: data.shareURI,
      description: data.description,
      isPublic: data.isPublic,
      isDone: false, // 저장 버튼은 isDone false
      schedule: data.schedule,
      destinationCart: data.destinationCart,
    };
    try {
      const res = await API.post("/planning/add-plan", planData);
      setData((prev) => ({
        ...prev,
        id: res.data.planId,
      }));
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible]);
  // 제출
  function submitHandler() {
    navigate("/planning/result");
  }
  return (
    <React.Fragment>
      {modalVisible &&
        ReactDOM.createPortal(
          <div className="animate-pop flex h-[5.26vh] w-[10vw] items-center justify-center rounded-md bg-[#D0C9F8] text-xl font-semibold shadow-lg">
            저장 완료
          </div>,
          document.getElementById("popModal"),
        )}
      <div className="flex h-[18%] w-[93%] items-start justify-between">
        <div className="flex h-[70%] w-1/4 items-end justify-start">
          <p className="mr-4 flex h-full w-[30%] items-end text-4xl">
            {region}
          </p>
          <div className="relative z-30 flex h-full w-[70%] items-end">
            <button
              onClick={resetDate}
              className={
                !date.start ? "relative z-20 text-white" : "tracking-widest"
              }
            >
              {planPeriod}
            </button>
            {!date.start && (
              <>
                <div className="fixed inset-0 h-full w-screen bg-black/70" />
                <CalenderContainer />
              </>
            )}
          </div>
        </div>

        <div className="relative flex h-4/5 w-[40%] items-end justify-end">
          <button
            className="mr-[5%] h-[40%] w-[16.4%] rounded-lg border-1 border-solid border-black text-sm"
            onClick={saveHandler}
          >
            저장
          </button>
          <button
            className="h-[40%] w-[16.4%] rounded-lg border-1 border-solid border-black bg-[#ffcb16] text-sm"
            onClick={submitHandler}
          >
            다음
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlanHeader;
