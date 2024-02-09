import React, { useEffect, useState, useRef } from "react";
// router
import { useLocation, useNavigate } from "react-router-dom";
// axios
import { API } from "../api/API";
// recoil
import { planState, currDate } from "../lib/constants/plandata";
import { user } from "../lib/constants/userInfo";
import { useRecoilState, useRecoilValue } from "recoil";
// icons
import { ImLink } from "react-icons/im";
import FixBtn from "../assets/icons/fix.svg?react";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
// custom hooks

import { useConfirmModal } from "../hook/useConfirmModal";
import { all } from "axios";

// default
const InitPost = {
  post: {
    _id: null,
    name: null,
    ownerUsername: null,
    city: null,
    date: {
      start: null,
      end: null,
    },
    dateAdded: null,
    period: null,
    season: null,
    totalCost: null,
    numPeople: null,
    likes: null,
    scraps: null,
    image: null,
    shareUri: null,
    description: null,
    isPublic: null,
    isDone: null,
    schedule: [
      {
        destination: null,
        destinationID: null,
        activity: null,
        nDay: null,
        startTime: null,
        duration: null,
        endTime: null,
        latlng: null,
      },
    ],
    destinationCart: null,
  },
  comments: [],
  isLiked: null,
  isScraped: null,
};
const PostPage = () => {
  const navigate = useNavigate();
  // modal
  const { openModal } = useConfirmModal();
  const location = useLocation();
  const [postData, setPostData] = useState(InitPost);
  const [community, setCommunity] = useState(location.state.community);
  useEffect(() => {
    async function getPostData() {
      try {
        const res = await API.get(`/community/${location.state.planId}`);
        console.log("postdata", res.data);
        setPostData(res.data);
      } catch (error) {
        console.log("error occured in getPostData on PlanResultPage");
      }
    }
    getPostData();
  }, []);
  // 함수들
  async function likeHandler() {
    try {
      const res = await API.post(`/community/${postData.post._id}/like`);
      setPostData((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        post: {
          ...prev.post,
          likes:
            res.data === "Like added"
              ? prev.post.likes + 1
              : prev.post.likes - 1,
        },
      }));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function scrapHandler() {
    try {
      const res = await API.post(`/community/${postData.post._id}/scrap`);
      setPostData((prev) => ({
        ...prev,
        isScraped: !prev.isScraped,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  // #2. 글 삭제
  async function deletePost() {
    try {
      const res = await API.delete("/planning/delete", {
        data: {
          planId: postData.post._id,
        },
      });
      navigate("/home/posts", { state: { value: "posts" } });
    } catch (error) {
      console.log(error);
    }
  }
  function deletePostHandler() {
    openModal({
      content: "게시글 삭제시 복구가 불가능합니다.\n삭제하시겠습니까?",
      callback: deletePost,
    });
  }
  // #3. 나의 여행지로 이동
  function movePosts() {
    navigate("/home/posts", { state: { value: "posts" } });
  }
  const [data, setData] = useRecoilState(planState);
  // #4. 수정하기
  function modifyHandler() {
    const planState = {
      id: postData.post._id,
      region: postData.post.city,
      title: postData.post.name,
      description: postData.post.description,
      image: postData.post.image,
      date: postData.post.date,
      period: postData.post.period, //몇일?
      totalCost: postData.post.totalCost,
      numPeople: postData.post.numPeople,
      likes: postData.post.likes,
      scraps: postData.post.scraps,
      shareURI: postData.post.shareUri,
      isPublic: postData.post.isPublic,
      isDone: postData.post.isDone,
      schedule: postData.post.schedule, // 방문 장소들
      destinationCart: postData.post.destinationCart, //보관함
    };
    setData(planState);
    navigate("/planning", { state: { region: postData.post.city } });
  }

  // communtiy
  function moveCommunity() {
    navigate("/community");
  }
  return (
    <div className="relative flex h-[87.2dvh] w-full flex-col items-center justify-start">
      {/* Header */}
      <div className="relative flex h-[15.7dvh] w-[83%] justify-between">
        <button
          onClick={community ? moveCommunity : movePosts}
          className="relative bottom-[21.3%] flex aspect-[3.825/1] h-[32.8%] items-center justify-start self-end rounded-md border-1 border-solid border-black text-xs"
        >
          <FaBars style={{ width: "35%", height: "50%" }} />
          <p className="w-1/2">{community ? "목록" : "나의 여행지"}</p>
        </button>
        <div
          className="flex w-[32%] items-end justify-between text-xs"
          style={
            community
              ? { justifyContent: "end" }
              : { justifyContent: "space-between" }
          }
        >
          <button className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black">
            <ImLink color="#00000060" style={{ width: "30%", height: "40%" }} />
            <p className="w-1/3">공유</p>
          </button>
          {!community && (
            <>
              <button
                onClick={modifyHandler}
                className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black"
              >
                <FixBtn style={{ width: "30%" }} />
                <p className="w-1/3">수정</p>
              </button>
              <button
                onClick={deletePostHandler}
                className="relative bottom-[21.3%] flex aspect-[2.8/1] h-[32.8%] w-[29.16%] items-center justify-center rounded-md border-1 border-solid border-black"
              >
                <FaTrashAlt color="#00000060" style={{ width: "30%" }} />
                <p className="w-1/3">삭제</p>
              </button>
            </>
          )}
        </div>
      </div>
      {/* Post */}
      <div className="flex h-[71.5dvh] w-[83%] flex-col">
        <PostCard postData={postData} />
        {/* 좋아요 공유 스크랩 */}
        <div className="flex h-[20.1%] w-1/4 justify-between">
          <div
            onClick={likeHandler}
            className="relative top-[20%] flex h-[28.8%] w-[26.8%] cursor-pointer items-center justify-center rounded-md border-1 border-solid border-black text-xs"
          >
            {postData.isLiked ? (
              <FaHeart style={{ width: "40%", height: "45%" }} />
            ) : (
              <FaRegHeart style={{ width: "40%", height: "45%" }} />
            )}

            <p className="flex w-1/3 justify-center">{postData.post.likes}</p>
          </div>
          <div className="relative top-[20%] flex h-[28.8%] w-[26.8%] cursor-pointer items-center justify-center rounded-md border-1 border-solid border-black text-xs">
            <IoMdShareAlt style={{ width: "40%", height: "65%" }} />
            <p className="w-1/3">공유</p>
          </div>
          <div
            onClick={scrapHandler}
            className="relative top-[20%] flex h-[28.8%] w-[30.9%] cursor-pointer items-center justify-center rounded-md border-1 border-solid border-black text-xs"
          >
            {postData.isScraped ? (
              <FaBookmark style={{ width: "40%", height: "45%" }} />
            ) : (
              <FaRegBookmark style={{ width: "40%", height: "45%" }} />
            )}

            <p className="w-1/2">스크랩</p>
          </div>
        </div>
        <CommentList postData={postData} />
      </div>
    </div>
  );
};

export default PostPage;

const PostCard = ({ postData }) => {
  const data = postData.post;
  console.log("description", data.description);
  return (
    <div className="relative flex h-[56.2%] w-full justify-center rounded-md shadow-box">
      <div className="flex h-full w-[44.7%] items-center justify-center">
        <img
          src={data.image}
          alt="포스트 이미지"
          className="h-[84.7%] w-[91%] rounded-md object-cover"
        />
      </div>
      <div className="h-full w-[55.3%]">
        <p className="flex h-[15.3%] w-full items-end  text-sm text-[#00000040]">
          {data.city && data.city.slice(0, 2)}
        </p>
        <p className="flex h-[10.2%] w-full items-center  font-semibold">
          {data.name}
        </p>
        <div className="h-[21.9%] w-full  text-xs text-[#00000040]">
          <p className="flex h-1/2 w-full items-end">{data.ownerUsername}</p>
          <p className="flex h-1/2 w-full items-center">
            {data.date.start} - {data.date.end} |{" "}
            {data.isPublic ? "공개" : "비공개"}
          </p>
        </div>
        <div className="relative flex h-[19.8%] w-[45.5%] items-center justify-between  text-xs">
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
          <p className="h-[90%] w-[90%] resize-none overflow-y-auto whitespace-pre-wrap rounded-md bg-[#F5F5F5] p-3 text-sm">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const CommentList = ({ postData }) => {
  const allComments = postData.comments;
  const [userComment, setUserComment] = useState(null);
  const commentRef = useRef();
  const userInfo = useRecoilValue(user);
  // functions
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // 부드러운 스크롤 효과를 위해 'smooth' 옵션 사용
    });
    console.log("scrolled to boottm");
  }
  async function addCommentHandler(e) {
    e.preventDefault();
    try {
      const res = await API.post(
        `/community/${postData.post._id}/comment/add`,
        {
          content: userComment,
        },
      );
      // 임시로 저장 (필요 : content, username)
      allComments.unshift({
        content: userComment,
        username: userInfo.username,
      });
      scrollToBottom();
      setUserComment(null);
      commentRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  }
  const comments = allComments.map((comment) => (
    <Comment key={comment.content} comment={comment} />
  ));
  return (
    <div className="relative min-h-[5.76%] w-full">
      <p className="flex min-h-[4.18vh] items-center">
        댓글 {postData.comments && postData.comments.length}개
      </p>
      {/* Add Comments */}
      <div className="flex h-[10.5vh] min-h-[10.5vh] w-full flex-col rounded-md  bg-[#F5F5F5]">
        <p className="ml-3 flex h-1/2 w-full items-center font-semibold">
          {userInfo.username}
        </p>
        <form
          onSubmit={(e) => addCommentHandler(e)}
          className="relative bottom-[20%] flex h-1/2 w-full items-end justify-start"
        >
          <input
            ref={commentRef}
            type="text"
            placeholder="댓글 추가"
            className="ml-3 h-4/5 w-[91%] border-b-[1.5px] border-solid border-[#00000040] bg-[#F5F5F5] focus:outline-none"
            onInput={(e) => setUserComment(e.target.value)}
          />

          <button className="ml-3 flex h-[85%] w-[4.47%] items-center justify-center rounded-lg border-1 border-solid border-black  bg-[#FFCB16]  hover:cursor-pointer ">
            댓글
          </button>
        </form>
        <div className="absolute top-[120%] flex w-full flex-col rounded-md bg-[#F5F5F5]">
          {comments}
        </div>
      </div>
      {/* 댓글들 */}
    </div>
  );
};

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="items-cneter flex h-[10.9vh] flex-col">
        <p
          onClick={(e) =>
            navigate(`/community/userPlans/${e.target.innerHTML}`)
          }
          className="ml-3 flex h-1/2 w-auto items-center hover:cursor-pointer "
        >
          {comment.username}
        </p>
        <p className="ml-3 flex  min-h-[30%] w-[91%] items-center break-all border-b-[1.5px] border-solid border-black">
          {comment.content}
        </p>
      </div>
      <div className="absolute bottom-[-13%] h-[3vh] w-full bg-white" />
    </>
  );
};
