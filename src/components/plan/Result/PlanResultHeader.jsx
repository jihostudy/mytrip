import React, { useEffect, useState } from "react";
// recoil
import { planState } from "../../../lib/constants/plandata";
import { useRecoilState } from "recoil";
// hooks
import { useConfirmModal } from "../../../hook/useConfirmModal";
// icons
import MinusIcon from "../../../assets/icons/Minus.svg?react";
import PlusIcon from "../../../assets/icons/Plus.svg?react";
const PlanResultHeader = () => {
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
  const [numPeople, setNumPeople] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  //Functions
  function handlePeople(value) {
    if (value === "plus") setNumPeople((prev) => prev + 1);
    else if (value === "minus" && numPeople != 1)
      setNumPeople((prev) => prev - 1);
  }
  useEffect(() => {
    console.log(totalCost);
  }, [totalCost]);
  function publicHandler() {}
  function submitHandler() {}
  return (
    <div className="relative flex h-[15%] w-[93%] items-center justify-between">
      {/* 정보 */}
      <div className="flex h-3/5 w-1/4 items-end justify-start">
        <p className="mr-4 flex h-full w-[30%] items-end text-4xl">
          {data.region.slice(0, 2)}
        </p>
        <div className="relative z-30 flex h-full w-[70%] items-end">
          {planPeriod}
        </div>
      </div>
      {/* 선택 */}
      <div className="relative flex h-4/5 w-1/3 items-end justify-evenly">
        <div className="flex h-[45%] w-[38%] items-center justify-around rounded-md border-[1px] border-solid border-black">
          <p className="flex h-full w-2/5 items-center justify-center">인원</p>

          <button
            className="flex h-full w-1/5 items-center justify-center"
            onClick={() => handlePeople("minus")}
          >
            <MinusIcon
              stroke="#989BA7"
              fill="none"
              className="hover:fill-red-200 hover:stroke-black"
            />
          </button>
          <p className="flex h-full w-1/5 items-center justify-center text-center">
            {numPeople}
          </p>
          <button
            className="flex h-full w-1/5 items-center justify-center"
            onClick={() => handlePeople("plus")}
          >
            <PlusIcon
              stroke="#989BA7"
              fill="none"
              className="hover:fill-blue-200 hover:stroke-black"
            />
          </button>
        </div>
        <div className="flex h-[45%] w-[38%] items-center justify-evenly rounded-md border-[1px] border-solid border-black">
          <label className="flex w-2/5 justify-center">경비</label>
          <input
            type="number"
            placeholder="입력"
            className="h-full w-2/5 text-center"
            pattern="\d*"
            onBlur={(e) => setTotalCost(e.target.value)}
          />
          <p className="w-1/5">만원</p>
        </div>
      </div>
      {/* 오른쪽 */}
      <div className="relative flex h-3/5 w-[45%] items-end justify-end">
        <button
          className="mr-[5%] h-[55%] w-[13%] rounded-lg border-[1px] border-solid border-black"
          onClick={publicHandler}
        >
          공개
        </button>
        <button
          className="h-[55%] w-[13%] rounded-lg border-[1px] border-solid border-black bg-[#ffcb16]"
          onClick={submitHandler}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PlanResultHeader;
