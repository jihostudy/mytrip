import React from "react";
// router
import { useLocation } from "react-router-dom";
// icons
import { ImLink } from "react-icons/im";
import FixBtn from "../assets/icons/fix.svg?react";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
const PostPage = () => {
  const location = useLocation();
  console.log("포스트넘겨받은 데이터 ", location.state);
  const postData = location.state;
  return (
    <div className="relative flex h-[87.2dvh] w-full flex-col items-center justify-start">
      {/* Header */}
      <div className="relative flex h-[15.7dvh] w-[83%] justify-between">
        <button className="relative bottom-[21.3%] flex aspect-[3.825/1] h-[32.8%] items-center justify-start self-end rounded-md border-1 border-solid border-black text-xs">
          <FaBars style={{ width: "35%", height: "50%" }} />
          <p className="w-1/2">나의 여행지</p>
        </button>
        <div className="flex w-[32%] items-end justify-between text-xs">
          <button className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black">
            <ImLink color="#00000060" style={{ width: "30%", height: "40%" }} />
            <p className="w-1/3">공유</p>
          </button>
          <button className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black">
            <FixBtn style={{ width: "30%" }} />
            <p className="w-1/3">수정</p>
          </button>
          <button className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black">
            <FaTrashAlt color="#00000060" style={{ width: "30%" }} />
            <p className="w-1/3">삭제</p>
          </button>
        </div>
      </div>
      {/* Post */}
      <div className="flex h-[71.5dvh] w-[83%] flex-col">
        <PostCard postData={postData} />
        {/* 좋아요 공유 스크랩 */}
        <div className="flex h-[20.1%] w-1/4 justify-between">
          <div className="relative top-[20%] flex h-[28.8%] w-[26.8%] items-center justify-center rounded-md border-1 border-solid border-black text-xs">
            <FaHeart style={{ width: "40%", height: "45%" }} />
            <p className="w-1/3">999</p>
          </div>
          <div className="relative top-[20%] flex h-[28.8%] w-[26.8%] items-center justify-center rounded-md border-1 border-solid border-black text-xs">
            <IoMdShareAlt style={{ width: "40%", height: "65%" }} />
            <p className="w-1/3"> 공유</p>
          </div>
          <div className="relative top-[20%] flex h-[28.8%] w-[30.9%] items-center justify-center rounded-md border-1 border-solid border-black text-xs">
            <FaRegBookmark style={{ width: "40%", height: "45%" }} />
            <p className="w-1/2">스크랩</p>
          </div>
        </div>
        <CommentList />
      </div>
    </div>
  );
};

export default PostPage;

const PostCard = ({ postData }) => {
  const data = postData.post;
  console.log("PostCard데이터: ", data);
  return (
    <div className="relative flex h-[56.2%] w-full justify-center shadow-box">
      <div className="flex h-full w-[44.7%] items-center justify-center">
        <img
          src={data.image}
          alt="포스트 이미지"
          className="h-[84.7%] w-[91%] rounded-md object-cover"
        />
      </div>
      <div className="h-full w-[55.3%]">
        <p className="flex h-[15.3%] w-full items-end  text-sm text-[#00000040]">
          {data.city.slice(0, 2)}
        </p>
        <p className="flex h-[10.2%] w-full items-center  font-semibold">
          {data.name}
        </p>
        <div className="h-[21.9%] w-full  text-xs text-[#00000040]">
          <p className="flex h-1/2 w-full items-end">닉네임</p>
          <p className="flex h-1/2 w-full items-center">
            {data.date.start} - {data.date.end} |{" "}
            {data.isPublic ? "공개" : "비공개"}
          </p>
        </div>
        <div className="relative flex h-[19.8%] w-[45.5%] items-center justify-around  text-xs">
          <p className="flex h-[51.6%] w-[25.2%] items-center justify-center rounded-md bg-[#D9D9D9] ">
            {data.season}여행
          </p>
          <p className="flex h-[51.6%] w-[25.2%] items-center justify-center rounded-md bg-[#D9D9D9] ">
            {data.period - 1}박 {data.period}일
          </p>
          <p className="flex h-[51.6%] w-[16%] items-center justify-center rounded-md bg-[#D9D9D9] ">
            {data.numPeople}명
          </p>
          <p className="flex h-[51.6%] w-[22.7%] items-center justify-center rounded-md bg-[#D9D9D9] ">
            {data.totalCost}만원
          </p>
        </div>
        <div className="flex h-[29%] w-full items-center justify-start">
          <p className="h-[90%] w-[90%] rounded-md bg-[#F5F5F5]  p-3 text-sm">
            {data.description} 고등학교 친구들이랑 7월에 놀러가기로함
          </p>
        </div>
      </div>
    </div>
  );
};

const CommentList = () => {
  return (
    <div className="relative min-h-[5.76%] w-full">
      <p className="flex min-h-[4.18vh] items-center">댓글 000개</p>
      {/* Add Comments */}
      <div className="flex h-[10.5vh] min-h-[10.5vh] w-full flex-col rounded-md  bg-[#F5F5F5]">
        <p className="ml-3 flex h-1/2 w-full items-center">나의 닉네임</p>
        <div className="relative bottom-[20%] flex h-1/2 w-full items-end justify-start">
          <input
            type="text"
            placeholder="댓글 추가"
            className="ml-3 h-4/5 w-[91%] border-b-[1.5px] border-solid border-[#00000040] bg-[#F5F5F5] text-[#00000040]"
          />

          <p className="ml-3 flex h-[85%] w-[4.47%] items-center justify-center rounded-md border-1 border-solid border-black  bg-[#FFCB16]">
            댓글
          </p>
        </div>
      </div>
      {/* 댓글들 */}
      <div className="absolute top-[120%] flex w-full flex-col rounded-md bg-[#F5F5F5]">
        <div className="items-cneter flex h-[10.9vh] flex-col">
          <p className="ml-3 flex h-1/2 items-center ">닉네임</p>
          <p className="ml-3 flex h-[30%] w-[91%] items-center border-b-[1.5px] border-solid border-black ">
            댓글입니다
          </p>
        </div>
        <div className="items-cneter flex h-[10.9vh] flex-col">
          <p className="ml-3 flex h-1/2 items-center ">닉네임</p>
          <p className="ml-3 flex h-[30%] w-[91%] items-center border-b-[1.5px] border-solid border-black ">
            댓글입니다
          </p>
        </div>
        <div className="items-cneter flex h-[10.9vh] flex-col">
          <p className="ml-3 flex h-1/2 items-center ">닉네임</p>
          <p className="ml-3 flex h-[30%] w-[91%] items-center border-b-[1.5px] border-solid border-black ">
            댓글입니다
          </p>
        </div>
        <div className="items-cneter flex h-[10.9vh] flex-col">
          <p className="ml-3 flex h-1/2 items-center ">닉네임</p>
          <p className="ml-3 flex h-[30%] w-[91%] items-center border-b-[1.5px] border-solid border-black ">
            댓글입니다
          </p>
        </div>
        <div className="absolute bottom-[-13%] h-[3vh] w-full bg-white" />
      </div>
    </div>
  );
};

const Comments = () => {
  return <div></div>;
};
