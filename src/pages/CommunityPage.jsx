import React, { useEffect, useRef, useState } from "react";

// component
import CalenderContainer from "../components/Calender/CalenderContainer";

// API
import { API } from "../api/API";

// icon
import SearchIcon from "../assets/icons/searchIcon.svg?react";
import PeopleIcon from "../assets/icons/people.svg?react";
import MoneyIcon from "../assets/icons/money.svg?react";
import CalenderIcon from "../assets/icons/calender.svg?react";

const CommunityPage = () => {
  // ------------------------------- style -------------------------------
  const btnClickStyle =
    "h-[80%] w-[8%] rounded-md border-1 border-solid border-black bg-[#38C3FF] hover:scale-110 ";
  const btnStyle =
    "h-[80%] w-[8%] rounded-md border-1 border-solid border-black hover:scale-110 ";

  // ----------------------------- filtering -----------------------------
  const [isClick, setIsClick] = useState(true); // true : likes, false : date
  const [isCalender, setIsCalender] = useState(false);

  const [query, setQuery] = useState({
    city: "",
    sort: "likes", // likes, date
    cost: "",
    num: "",
    period: "",
    date: "",
  });
  const cityRef = useRef();
  const peopleRef = useRef();
  const costRef = useRef();

  let planPeriod;
  const date = query.date;
  if (!date.start) {
    planPeriod = "날짜를 입력해주세요";
  } else {
    // 당일치기
    if (date.start === date.end) planPeriod = date.start.slice(5);
    else planPeriod = date.start.slice(5) + " ~ " + date.end.slice(5);
  }
  console.log(planPeriod);

  // handler
  function submitHandler(e) {
    e.preventDefault();

    // query 만들기
    // 인기순, 최신순 클릭 시에도 fetch 필요...
    getData();
  }
  function changeHandler(e, action) {
    // 여행지, 인원, 경비
    const value = e.target.value;

    if (action === "city") {
      setQuery((prev) => ({ ...prev, city: value }));
    } else if (action === "people") {
      setQuery((prev) => ({ ...prev, num: value }));
    } else if (action === "cost") {
      setQuery((prev) => ({ ...prev, cost: value }));
    }
  }
  function clickHandler() {
    // 인기순, 최신순 클릭
    if (isClick) {
      setQuery((prev) => ({ ...prev, sort: "date" }));
    } else {
      setQuery((prev) => ({ ...prev, sort: "likes" }));
    }

    setIsClick((prev) => !prev);

    // getData();
  }
  function calenderHandler() {
    // 달력 열기
    setIsCalender((prev) => !prev);
  }
  console.log(query);
  // fetch data
  function getData() {
    // set post
  }

  // ------------------------------- post --------------------------------
  const [posts, setPosts] = useState([]);
  // first data
  useEffect(() => {}, []);

  return (
    <div className="flex w-[100%] flex-col items-center gap-2">
      {/* 제목 */}
      <div className="flex h-[13dvh] w-[83%] items-end text-2xl font-semibold">
        커뮤니티
      </div>
      {/* 필터링 */}
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex h-[8dvh] w-[83%] items-center justify-between rounded-md border-2 border-solid border-[#F5F5F5] px-4 text-sm shadow-sm"
      >
        <div className="flex h-[60%] w-[27%] items-center justify-center rounded-md bg-[#F5F5F5]">
          <SearchIcon />
          <input
            type="text"
            ref={cityRef}
            onBlur={(e) => changeHandler(e, "city")}
            className="h-[80%] bg-[#F5F5F5]"
            placeholder="여행지를 검색해보세요"
          />
        </div>
        <div className=" flex h-[60%] w-[27%] items-center justify-center rounded-md bg-[#F5F5F5]">
          <div className="relative flex h-[80%] w-[70%] items-center justify-center hover:cursor-pointer">
            <CalenderIcon onClick={calenderHandler} />
            <p onClick={calenderHandler} className="ml-2">
              01.22 월 - 01.23 화 1박
            </p>
            {isCalender && (
              <CalenderContainer
                action="community"
                setQuery={setQuery}
                setIsCalender={setIsCalender}
              />
            )}
          </div>
        </div>
        <div className="flex h-[60%] w-[13%] items-center justify-center rounded-md bg-[#F5F5F5]">
          <PeopleIcon />
          <input
            type="number"
            ref={peopleRef}
            onBlur={(e) => changeHandler(e, "people")}
            className="h-[80%] w-[20%] bg-[#F5F5F5] text-right"
          />
          <p>명</p>
        </div>
        <div className="flex h-[60%] w-[13%] items-center justify-center rounded-md bg-[#F5F5F5]">
          <MoneyIcon />
          <input
            type="number"
            ref={costRef}
            onBlur={(e) => changeHandler(e, "cost")}
            className="h-[80%] w-[20%] bg-[#F5F5F5] text-right"
          />
          <p>만원</p>
        </div>
        <button
          type="submit"
          className="h-[60%] w-[10%] rounded-md bg-[#38C3FF] hover:scale-110"
        >
          검색
        </button>
      </form>
      {/* 인기순, 최신순 */}
      <div className="flex h-[5dvh] w-[83%] items-center justify-start gap-4 text-sm">
        <button
          onClick={clickHandler}
          className={isClick ? btnClickStyle : btnStyle}
        >
          인기순
        </button>
        <button
          onClick={clickHandler}
          className={!isClick ? btnClickStyle : btnStyle}
        >
          최신순
        </button>
      </div>
      {/* 게시글 */}
      <div className="flex w-[83%] justify-center border border-solid">
        POST
      </div>
    </div>
  );
};

export default CommunityPage;
