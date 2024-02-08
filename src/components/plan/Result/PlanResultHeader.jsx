import React, { useEffect, useState } from "react";
// axios
import { API } from "../../../api/API";
// recoil
import { planState } from "../../../lib/constants/plandata";
import { useRecoilState } from "recoil";
// hooks
import { useConfirmModal } from "../../../hook/useConfirmModal";
//router
import { Link } from "react-router-dom";
// icons
import MinusIcon from "../../../assets/icons/Minus.svg?react";
import PlusIcon from "../../../assets/icons/Plus.svg?react";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";

const PlanResultHeader = ({ openModal }) => {
  const [data, setData] = useRecoilState(planState);
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
  //   const [] = useState(false);
  //Functions
  function totalCostHandler(value) {
    setData((prev) => ({
      ...prev,
      totalCost: value,
    }));
  }
  function handlePeople(value) {
    if (value === "plus")
      setData((prev) => ({
        ...prev,
        numPeople: prev.numPeople + 1,
      }));
    else if (value === "minus" && data.numPeople != 1)
      setData((prev) => ({
        ...prev,
        numPeople: prev.numPeople - 1,
      }));
  }
  // #2. isPublic
  function publicHandler() {
    setData((prev) => ({
      ...prev,
      isPublic: !prev.isPublic,
    }));
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
    <>
      <div className="relative flex h-[18%] w-[93%] items-start justify-between">
        {/* 정보 */}
        <div className="flex h-[70%] w-1/4 items-end justify-start">
          <p className="mr-4 flex h-full w-[30%] items-end text-4xl">
            {data.region.slice(0, 2)}
          </p>
          <div className="relative z-30 flex h-full w-[70%] items-end tracking-widest">
            {planPeriod}
          </div>
        </div>
        {/* 선택 */}
        <div className="relative flex h-4/5 w-1/3 items-end justify-evenly">
          <div className="flex h-[45%] w-[38%] items-center justify-around rounded-md border-[1px] border-solid border-black text-xs">
            <p className="flex h-full w-2/5 items-center justify-center">
              인원
            </p>

            <button
              className="flex h-full w-1/5 items-center justify-center"
              onClick={() => handlePeople("minus")}
            >
              <MinusIcon
                style={{ width: "70%" }}
                stroke="#989BA7"
                fill="none"
                className="hover:fill-red-200 hover:stroke-black"
              />
            </button>
            <p className="flex h-full w-1/5 items-center justify-center text-center">
              {data.numPeople}
            </p>
            <button
              className="flex h-full w-1/5 items-center justify-center"
              onClick={() => handlePeople("plus")}
            >
              <PlusIcon
                style={{ width: "70%" }}
                stroke="#989BA7"
                fill="none"
                className="hover:fill-blue-200 hover:stroke-black"
              />
            </button>
          </div>
          <div className="flex h-[45%] w-[38%] items-center justify-evenly rounded-md border-[1px] border-solid border-black text-xs">
            <label className="flex w-2/5 justify-center">경비</label>
            <input
              type="number"
              placeholder="입력"
              className="h-full w-2/5 text-center"
              pattern="\d*"
              onBlur={(e) => totalCostHandler(e.target.value)}
            />
            <p className="w-1/5">만원</p>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="relative flex h-4/5 w-[40%] items-end justify-end text-xs">
          <button
            className="mr-[5%] flex h-[41.9%] w-[21.3%] items-center justify-center rounded-lg border-[1px] border-solid border-black"
            onClick={publicHandler}
          >
            {publicBtn}
          </button>
          <Link
            className="mr-[5%] flex h-[40%] w-[16.4%] items-center justify-center rounded-lg border-[1px] border-solid border-black"
            to="/planning"
            state={{ region: data.region }}
          >
            이전
          </Link>
          <button
            className="h-[40%] w-[16.4%] rounded-lg border-[1px] border-solid border-black bg-[#ffcb16]"
            onClick={openModal}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanResultHeader;
