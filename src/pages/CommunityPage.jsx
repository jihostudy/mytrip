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
import PeopleIcon from "../assets/icons/people.svg?react";
import MoneyIcon from "../assets/icons/money.svg?react";
import CalenderIcon from "../assets/icons/calender.svg?react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

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
  const [isCost, setIsCost] = useState(false);
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
  function clickHandler(current) {
    // 인기순, 최신순 클릭
    if (isClick && current === "date") {
      setQuery((prev) => ({ ...prev, sort: "date" }));
    } else if (!isClick && current === "likes") {
      setQuery((prev) => ({ ...prev, sort: "likes" }));
    } else return;

    setIsClick((prev) => !prev);

    // submitHandler();
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
      console.log(res);
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
  // console.log(posts);
  // first data
  useEffect(() => {
    submitHandler();
  }, [isClick]);

  return (
    <div className="flex w-[100%] flex-col items-center gap-2">
      {/* 제목 */}
      <div className="flex h-[11.5dvh] w-[83%] items-end text-2xl font-semibold">
        커뮤니티
      </div>
      {/* 필터링 */}
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex h-[8dvh] w-[83%] items-center justify-between rounded-md border-2 border-solid border-[#F5F5F5] px-4 text-sm shadow-sm"
      >
        {/* 1. 검색 */}
        <div className="flex h-[60%] w-[27%] items-center justify-center rounded-md bg-[#F5F5F5]">
          <FaSearch size="15" />
          <input
            type="text"
            ref={cityRef}
            onBlur={(e) => changeHandler(e, "city")}
            className="h-[80%] bg-[#F5F5F5]"
            placeholder="여행지를 검색해보세요"
          />
        </div>
        {/* 2. 날짜 */}
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
        {/* 3. 인원 */}
        <div className="relative flex h-[60%] w-[13%] items-center justify-center gap-2 rounded-md bg-[#F5F5F5]">
          <PeopleIcon
            className="hover:cursor-pointer"
            onClick={() => setIsPeople((prev) => !prev)}
          />
          <p
            className="hover:cursor-pointer"
            onClick={() => setIsPeople((prev) => !prev)}
          >
            {query.num}명
          </p>
          {isPeople && (
            <div className="absolute top-[100%] z-10 flex h-[200%] w-[230%] items-center justify-between rounded-md border border-solid border-black bg-white px-4 text-base shadow-box">
              <p>인원</p>
              <div className="flex h-[100%] w-[40%] items-center gap-3">
                <CiCircleMinus
                  size="30"
                  className="hover:scale-110 hover:cursor-pointer"
                  onClick={() =>
                    setQuery((prev) => ({
                      ...prev,
                      num: +prev.num - 1,
                    }))
                  }
                />
                {query.num ? <p>{query.num}</p> : <p>&nbsp;</p>}
                <CiCirclePlus
                  size="30"
                  className="hover:scale-110 hover:cursor-pointer"
                  onClick={() =>
                    setQuery((prev) => ({
                      ...prev,
                      num: +prev.num + 1,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>
        {/* 4. 경비 */}
        <div className="relative flex h-[60%] w-[13%] items-center justify-center gap-2 rounded-md bg-[#F5F5F5]">
          <MoneyIcon
            className="hover:cursor-pointer"
            onClick={() => setIsCost((prev) => !prev)}
          />
          <p
            className="hover:cursor-pointer"
            onClick={() => setIsCost((prev) => !prev)}
          >
            {query.cost}만원
          </p>
          {isCost && (
            <div className="absolute top-[100%] z-10 flex h-[200%] w-[230%] items-center justify-between gap-2 rounded-md border border-solid border-black bg-white px-4 text-base shadow-box">
              <p>경비</p>
              <input
                type="number"
                ref={costRef}
                onChange={(e) => changeHandler(e, "cost")}
                className="h-[50%] w-[40%] grow text-right text-sm"
                placeholder="액수를 입력해주세요"
              />
              <p>만원</p>
            </div>
          )}
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
          onClick={() => clickHandler("likes")}
          className={isClick ? btnClickStyle : btnStyle}
        >
          인기순
        </button>
        <button
          onClick={() => clickHandler("date")}
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
  // console.log(post.period);
  const navigate = useNavigate();

  // season
  console.log(post.date.start);
  const month = parseInt(post.date.start.split(".")[1]);
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

  // date formatting
  const date =
    format(post.date.start, "yy.MM.dd (iii) ", {
      locale: koLocale,
    }) +
    "~" +
    format(post.date.end, " yy.MM.dd (iii) ", {
      locale: koLocale,
    });

  // keyword
  const keywords = [
    season + " 여행",
    `${post.period - 1}박 ${post.period}일`,
    `${post.numPeople}명`,
    `${Math.floor(+post.totalCost / 10000)}만원`,
  ];
  // console.log(keywords);

  // console.log(post);
  // #1. Post 열기
  async function openPostHandler() {
    navigate("/planning/post", {
      state: { planId: post["_id"], community: true },
    });
  }
  return (
    <div
      onClick={openPostHandler}
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
        <p className="h-[25.5%] w-full text-base font-semibold">{post.name}</p>
        <div className="flex h-[20%] items-end gap-1">
          {keywords.map((keyword) => (
            <div
              key={post["_id"] + keyword}
              className="h-[50%]items-center flex justify-center rounded-md bg-[#D9D9D9] p-1 text-xs"
            >
              {keyword}
            </div>
          ))}
        </div>
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
