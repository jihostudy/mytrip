import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// API
import { API } from "../api/API";

// date-fns
import { format, parse, isAfter } from "date-fns";
import koLocale from "date-fns/locale/ko";

// icon
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";

const UserPlansPage = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  // fetch function
  async function getData() {
    try {
      const res = await API.get(`/community/posts/${username}`);
      // console.log(res);
      const status = res.status;
      if (status === 200) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      const status = error.response.error;
      if (status === 404) console.log(status, "user not found");
      else console.log(status, "server error");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(posts);

  return (
    <div className="flex w-[100%] flex-col items-center gap-10">
      <div className="flex h-[11.5dvh] w-[83%] items-end text-2xl font-semibold">
        {username} 님의 여행지
      </div>
      <div className="flex w-[83%] flex-wrap justify-between gap-y-7">
        {posts.map((post) => (
          <PostCard key={post["_id"] + "userplans"} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPlansPage;

// PostCard
const PostCard = ({ post }) => {
  // console.log(post.period);
  const navigate = useNavigate();

  // season
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
    `${Math.floor(+post.totalCost)}만원`,
  ];
  // console.log(keywords);

  // #1. Post 열기
  async function openPostHandler() {
    navigate("/planning/post", {
      state: { planId: post["planId"], community: true },
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
              key={post["planId"] + keyword}
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
