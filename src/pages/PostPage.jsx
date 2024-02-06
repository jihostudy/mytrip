import React from "react";
// router
import { useLocation } from "react-router-dom";
const PostPage = () => {
  const location = useLocation();
  console.log("포스트넘겨받은 데이터 ", location.state);
  const postData = location.state;
  return (
    <div className="relative flex h-[87.2dvh] w-full flex-col items-center justify-start border-1 border-solid border-black">
      {/* Header */}
      <div className="relative flex h-[15.7dvh] w-[83%] justify-between bg-fuchsia-200">
        <button className="relative bottom-[21.3%] aspect-[3.825/1] h-[32.8%] self-end rounded-md border-1 border-solid border-black">
          나의 여행지
        </button>
        <div className="flex w-[32%] items-end justify-between">
          <button className="relative bottom-[21.3%] aspect-[2.8/1] h-[32.8%] rounded-md border-1 border-solid border-black">
            공유
          </button>
          <button className="relative bottom-[21.3%] aspect-[2.8/1] h-[32.8%] rounded-md border-1 border-solid border-black">
            수정
          </button>
          <button className="relative bottom-[21.3%] aspect-[2.8/1] h-[32.8%] rounded-md border-1 border-solid border-black">
            삭제
          </button>
        </div>
      </div>
      {/* Post */}
      <div className="flex h-[71.5dvh] w-[83%] flex-col">
        <PostCard postData={postData} />
      </div>
    </div>
  );
};

export default PostPage;

const PostCard = ({ postData }) => {
  const data = postData.post;
  return (
    <div className="relative flex h-[56.2%] w-full justify-center bg-blue-300">
      <img
        src={data.image}
        alt="포스트 이미지"
        className="h-full w-[26.3%] border-1 border-solid border-black"
      />
      <div className="h-full w-[73.7%]"></div>
    </div>
  );
};
