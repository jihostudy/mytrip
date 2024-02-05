import React, { useEffect, useState } from "react";
// router
import { useLocation } from "react-router-dom";
// axios
import { API } from "../api/API";
// recoil
import { useRecoilValue } from "recoil";
import { user } from "../lib/constants/userInfo";
// images
import DefaultImage from "../assets/images/default-image-mypage.svg";
// icons
import { IoIosHeartEmpty } from "react-icons/io";

const Mypage = () => {
  // #0. 내 여행지 OR 스크랩한 여행지?
  const location = useLocation();
  const classify = location.state.value;
  console.log(classify);
  /*
  posts : 내 포스트 
  scrap-posts: 스크랩한 포스트
   */
  const userInfo = useRecoilValue(user);
  // #1. 데이터 불러오기
  const [planData, setPlanData] = useState();
  // #1-1. Fetch 함수
  async function fetchPlanData() {
    try {
      let res;
      // my-page/plans API
      if (classify === "posts") {
        res = await API.get("/my-page/plans");
      }
      // my-page/scraps API
      else {
        res = await API.get("/my-page/scraps");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPlanData();
  }, []);
  // #2. 필터 기능 (1: 전체, 2: 계획중, 3: 지난 여행)
  const [filter, setFilter] = useState(1);
  const buttonArr = ["전체", "계획중", "지난 여행"];
  function setFilterStyle(value) {
    let style;
    if (value === filter)
      style =
        "mr-3 h-[32%] rounded-md border-1 border-solid border-black bg-[#38C3FF] ";
    else {
      style =
        "mr-3 h-[32%] rounded-md border-1 border-solid border-black hover:bg-[#38C3FF] ";
    }
    switch (value) {
      case 1:
        style += "aspect-[1.375/1]";
        break;
      case 2:
        style += "aspect-[1.75/1]";
        break;
      case 3:
        style += "aspect-[2.28/1]";
        break;
    }
    return style;
  }
  const buttons = buttonArr.map((button, index) => (
    <button
      key={button}
      onClick={() => setFilter(index + 1)}
      className={setFilterStyle(index + 1)}
    >
      {button}
    </button>
  ));
  return (
    <div className="relative flex w-[100%] flex-col items-center">
      <p className="flex h-[13dvh] w-[83%] items-end text-2xl font-semibold">
        {classify === "posts" ? "나의 여행지" : "스크랩한 여행지"}
      </p>
      {classify === "posts" && (
        <div className="flex h-[13dvh] w-[83%] items-center justify-start text-xs">
          {buttons}
        </div>
      )}
      <Posts postData={null} />
    </div>
  );
};

export default Mypage;

const Posts = ({ postData }) => {
  return (
    <div className="relative grid w-[83%] grid-cols-2 gap-x-5 gap-y-6">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

const PostCard = ({ Data }) => {
  return (
    <div className="relative flex h-[20dvh] justify-center rounded-md shadow-box">
      <div className="flex h-full w-[46%] items-center justify-center">
        <img
          src={DefaultImage}
          alt="기본 이미지"
          className="aspect-[1.96:1] h-[79.5%] rounded-md"
        />
      </div>
      <div className="h-full w-[54%]">
        <p className="flex h-[21%] w-full items-end text-xs">평창</p>
        <p className="h-[45.5%] w-full text-base font-semibold">별똥별 모임</p>
        <div className="relative flex h-[15.4%] w-full items-center justify-start text-xs">
          <IoIosHeartEmpty />
          <p className="ml-[2%]"> 100</p>
        </div>
        <p className="h-[11.5%] w-full text-xs">
          24.03.23 (토) ~ 24.03.23 (일) | 공개
        </p>
      </div>
    </div>
  );
};
