import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// component
import CalenderContainer from "../components/Calender/CalenderContainer";

// API
import { API } from "../api/API";

// date-fns
import { format, parse, isAfter } from "date-fns";
import koLocale from "date-fns/locale/ko";

// icon
import SearchIcon from "../assets/icons/searchIcon.svg?react";
import PeopleIcon from "../assets/icons/people.svg?react";
import MoneyIcon from "../assets/icons/money.svg?react";
import CalenderIcon from "../assets/icons/calender.svg?react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";

// day
const DAY = ["일", "월", "화", "수", "목", "금", "토"];

const CommunityPage = () => {
  // ------------------------------- style -------------------------------
  const btnClickStyle =
    "h-[80%] w-[8%] rounded-md border-1 border-solid border-black bg-[#38C3FF] hover:scale-110 ";
  const btnStyle =
    "h-[80%] w-[8%] rounded-md border-1 border-solid border-black hover:scale-110 ";

  // ----------------------------- filtering -----------------------------
  const [isClick, setIsClick] = useState(true); // true : likes, false : date
  const [isCalender, setIsCalender] = useState(false);
  const [isPeople, setIsPeople] = useState(false);
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
    const startDay = new Date(date.start).getDay();
    const endDay = new Date(date.end).getDay();
    if (date.start === date.end) planPeriod = date.start.slice(5);
    else
      planPeriod =
        date.start.slice(5) +
        " " +
        DAY[startDay] +
        " ~ " +
        date.end.slice(5) +
        " " +
        DAY[endDay] +
        "(" +
        (query.period - 1) +
        "박)";
  }
  // console.log(planPeriod);

  // handler
  function submitHandler(e) {
    if (e) e.preventDefault();

    // query 만들기
    const params = new URLSearchParams();
    const keys = Object.keys(query);
    keys.map((key) => {
      if (key !== "date") params.set(key, query[key]);
    });

    console.log("params --> ", params.toString());

    // 인기순, 최신순 클릭 시에도 fetch 필요...
    getData(params.toString());
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

    submitHandler();
  }
  function calenderHandler() {
    // 달력 열기
    setIsCalender((prev) => !prev);
  }

  // fetch data
  async function getData(param) {
    // set post
    try {
      console.log(`/community?${param}`);
      const res = await API.get(`/community?${param}`);
      // console.log(res);
      const status = res.status;
      if (status === 200) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      const status = error.response.error;
      console.log(status, "server error");
      alert("다시 시도해주세요");
    }
  }

  // ------------------------------- post --------------------------------
  const [posts, setPosts] = useState([]);
  console.log(posts);
  // first data
  useEffect(() => {
    submitHandler();
  }, []);

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
          <div className="relative z-10 flex h-[80%] w-[70%] items-center justify-center hover:cursor-pointer">
            <CalenderIcon onClick={calenderHandler} />
            <p
              onClick={calenderHandler}
              className="ml-2 flex w-[100%] justify-center"
            >
              {planPeriod}
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
      <div className="flex w-[83%] flex-wrap justify-between gap-y-7">
        {posts.map((post) => (
          <PostCard key={post["_id"]} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;

// PostCard
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const start = post.date.start;
  let end = post.date.end;
  if (end) end = start;
  // console.log(
  //   `${start.slice(0, 4)}-${start.slice(5, 7)}-${start.slice(8)}`,
  //   `${end.slice(0, 4)}-${end.slice(5, 7)}-${end.slice(8)}`,
  // );
  const date =
    format(
      `${start.slice(0, 4)}-${start.slice(5, 7)}-${start.slice(8)}`,
      "yy.mm.dd (iii) ",
      {
        locale: koLocale,
      },
    ) +
    "~" +
    format(
      `${end.slice(0, 4)}-${end.slice(5, 7)}-${end.slice(8)}`,
      " yy.mm.dd (iii) ",
      {
        locale: koLocale,
      },
    );

  // #1. Post 열기
  async function openPostHandler() {
    try {
      const res = await API.get(`/community/${post.planId}`);

      navigate("/planning/post", { state: res.data });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      // onClick={openPostHandler}
      className="hover: hover: relative flex h-[20dvh] w-[49%] origin-bottom justify-center rounded-md border-solid border-black shadow-box hover:scale-105 hover:cursor-pointer hover:border-1"
    >
      <div className="flex h-full w-[46%] items-center justify-center">
        <img
          src={post.image}
          alt="썸네일 이미지"
          className="aspect-[1.96:1] h-[79.5%] rounded-md"
        />
      </div>
      <div className="h-full w-[54%]">
        <p className="flex h-[21%] w-full items-end justify-between pr-3 text-xs">
          {post.city}
          {post.isScraped ? <FaBookmark /> : <FaRegBookmark />}
        </p>
        <p className="h-[45.5%] w-full text-base font-semibold">{post.name}</p>
        <div className="relative flex h-[15.4%] w-full items-center justify-start text-xs">
          {post.isLiked ? <IoIosHeart /> : <IoIosHeartEmpty />}
          <p className="ml-[2%]">{post.likes}</p>
        </div>
        <p className="h-[11.5%] w-full text-xs">
          {date} | {post.isPublic ? "공개" : "비공개"}
        </p>
      </div>
    </div>
  );
};
