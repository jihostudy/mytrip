import React, { useEffect, useRef, useState } from "react";
// components
import PlanResultHeader from "../components/plan/Result/PlanResultHeader";
// axios
import { API } from "../api/API";
// router
import { useNavigate } from "react-router-dom";
// recoil
import {
  currDate,
  defaultPlanState,
  planState,
} from "../lib/constants/plandata";
import { useRecoilState, useRecoilValue } from "recoil";
import PlanResultTimeTable from "../components/plan/Result/PlanResultTimeTable";
// icons
import { BiImageAdd } from "react-icons/bi";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuSwitchCamera } from "react-icons/lu";
// images
import ThumbNailImage0 from "../assets/images/thumbnailImage/Image1.svg";
import ThumbNailImage1 from "../assets/images/thumbnailImage/Image2.svg";
import ThumbNailImage2 from "../assets/images/thumbnailImage/Image3.svg";
import ThumbNailImage3 from "../assets/images/thumbnailImage/Image4.svg";
import ThumbNailImage4 from "../assets/images/thumbnailImage/Image5.svg";
import ThumbNailImage5 from "../assets/images/thumbnailImage/Image6.svg";
import ThumbNailImage6 from "../assets/images/thumbnailImage/Image7.svg";
import ThumbNailImage7 from "../assets/images/thumbnailImage/Image8.svg";
import ThumbNailImage8 from "../assets/images/thumbnailImage/Image9.svg";
const PlanResultPage = () => {
  const data = useRecoilValue(planState);
  let groupedByNday = Array.from({ length: data.period }, () => []);
  data.schedule.forEach((schedule) => {
    const nDayValue = schedule.nDay;
    groupedByNday[nDayValue - 1].push(schedule);
  });
  const resultData = groupedByNday.map((daySchedule, index) => {
    return (
      <PlanResultTimeTable
        key={index}
        schedule={daySchedule}
        nDay={index + 1}
      />
    );
  });
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative flex h-[87.2dvh] w-full flex-col items-center justify-start">
      {openModal && <PlanDescription closeModal={() => setOpenModal(false)} />}
      <PlanResultHeader openModal={() => setOpenModal(true)} />
      <div className="relative flex h-[77.4%] w-[93%] items-center justify-start overflow-hidden overflow-x-auto shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        {resultData}
      </div>
    </div>
  );
};

export default PlanResultPage;
//-------------------------------------------------modal-------------------------------------------------
const PlanDescription = ({ closeModal }) => {
  const [data, setData] = useRecoilState(planState);
  const [date, setDate] = useRecoilState(currDate);
  const navigate = useNavigate();

  // #0. 제목, 내용 관련
  function setTitle(value) {
    setData((prev) => ({
      ...prev,
      title: value,
    }));
  }
  function setDescription(value) {
    setData((prev) => ({
      ...prev,
      description: value,
    }));
  }

  // #1. 썸네일 이미지 관련
  function ImageUploadHandler(e) {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onloadend = () => {
      setData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
  }

  // #1-1. 썸네일 재제출 관련
  const fileInputRef = useRef(null);

  // #1-2. 기본썸네일 선택 관련
  const [timerCnt, setTimerCnt] = useState(0);
  useEffect(() => {
    const thumbnailTimer = setInterval(() => {
      setTimerCnt((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(thumbnailTimer);
  }, []);
  let thumbnailImages = [
    ThumbNailImage0,
    ThumbNailImage1,
    ThumbNailImage2,
    ThumbNailImage3,
    ThumbNailImage4,
    ThumbNailImage5,
    ThumbNailImage6,
    ThumbNailImage7,
    ThumbNailImage8,
  ];
  let defaultThumbnailImages = [];
  for (let i = 0; i < 3; i++) {
    defaultThumbnailImages.push(thumbnailImages[i + timerCnt * 3]);
  }

  // #2. Public 여부

  function setPublic() {
    setData((prev) => ({
      ...prev,
      isPublic: !prev.isPublic,
    }));
  }

  async function setDone() {
    setData((prev) => ({
      ...prev,
      isDone: !prev.isDone,
    }));
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
    console.log(month, season);
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
      isDone: true,
      schedule: data.schedule,
      destinationCart: data.destinationCart,
    };

    console.log("planData", planData);
    try {
      const res = await API.post("/planning/add-plan", planData);
      console.log(res);
      // 상공시 게시글 페이지로 이동
      setData(defaultPlanState);
      setDate(1);
      navigate("/planning/post", { state: { planId: res.data.planId } });
    } catch (error) {
      console.log("error occured on plaaning/add-plan");
    }
  }

  const publicBtn = data.isPublic ? (
    <>
      <p className="flex w-full items-center justify-evenly">
        <IoIosLock style={{ color: "#00000040" }} />
        비공개
      </p>
    </>
  ) : (
    <>
      <p className="flex w-full items-center justify-evenly">
        <IoIosUnlock style={{ height: "60%" }} />
        공개
      </p>
    </>
  );
  return (
    <div className="fixed inset-0 z-40 flex h-full w-screen items-center justify-center bg-black/70">
      <div className="fixed z-50 flex aspect-[2.2/1] w-1/2 flex-col items-center rounded-lg bg-white shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <div className="flex h-[25%] w-[93.4%] items-center justify-between font-semibold">
          여행 플랜 세부 정보
          <IoIosCloseCircleOutline
            style={{ height: "40%", width: "5%" }}
            className="cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="flex h-[52%] w-full items-center justify-evenly">
          <div className="group relative flex h-full w-[45%] items-center justify-center rounded-md bg-[#D9D9D9]">
            {data.image && (
              <>
                <img
                  src={data.image}
                  alt="썸네일"
                  className="absolute aspect-[1.9/1] h-full rounded-md bg-white object-cover"
                />
                <LuSwitchCamera
                  style={{ height: "10%" }}
                  className="absolute bottom-0 right-0 z-10 bg-none text-transparent hover:block group-hover:text-black"
                />
              </>
            )}

            <label
              htmlFor="thumbtail"
              className="z-10 flex h-full w-full flex-col items-center justify-center rounded-md text-center hover:cursor-pointer"
              // onClick={() => fileInputRef.current.click()}
            >
              {!data.image && (
                <BiImageAdd
                  style={{ height: "40%", width: "40%", color: "#828282" }}
                />
              )}
              {!data.image && "썸네일 업로드"}
            </label>
            <input
              id="thumbtail"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={ImageUploadHandler}
              className="invisible absolute"
            />
          </div>
          <div className="flex h-full w-[45%] flex-col items-end justify-between">
            <div className="relative flex h-1/5 w-full overflow-hidden rounded-md bg-[#F5F5F5]">
              <p className="flex h-full w-[13%] items-center justify-center bg-[#F5F5F5] font-semibold">
                제목
              </p>
              <input
                type="text"
                className="h-full w-[87%] bg-[#F5F5F5] focus:outline-none"
                placeholder="입력해주세요"
                value={data.title && data.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="realtive box-content flex h-[70%] w-full items-end overflow-hidden  rounded-md bg-[#F5F5F5]">
              <p className="flex h-[90%] w-[13%] items-start justify-center bg-[#F5F5F5] font-semibold">
                내용
              </p>
              <textarea
                className="h-[90%] w-[87%] resize-none overflow-y-auto bg-[#F5F5F5] focus:outline-none"
                placeholder="입력해주세요"
                value={data.description && data.description}
                onInput={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex h-[23%] w-[93.4%] items-center justify-between">
          <div className="flex h-full w-[48%] items-center justify-between">
            {defaultThumbnailImages.map((thumbnailImg) => (
              <img
                src={thumbnailImg}
                alt="기본 선택 이미지"
                className="aspect-[1.93/1] w-[31%] hover:cursor-pointer"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    image: thumbnailImg,
                  }))
                }
              />
            ))}
          </div>
          <div className="flex h-[45%] w-[30%] justify-between">
            <button
              onClick={setPublic}
              className="flex h-full w-1/2 items-center justify-center rounded-md border-1 border-solid border-black text-xs"
            >
              {publicBtn}
            </button>
            <button
              onClick={setDone}
              className="h-full w-2/5 rounded-md border-1 border-solid border-black  bg-[#FFCB16] text-xs"
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
