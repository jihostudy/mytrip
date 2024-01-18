import React, { useEffect, useState } from "react";
// Icons + Images
import searchIcon from "../assets/icons/searchIcon.svg";
// Dummy areas
const dummy_images = ["img1", "img2", "img3", "img4"];
// Input list
const input_list = ["강원도", "울산", "부산", "서울", "경기도", "수원", "강남"];
const HomePage = () => {
  const imgContanier = dummy_images.map((img) => (
    <li key={img} className="m-2">
      {img}
    </li>
  ));

  // 드롭다운 만들기
  const [filteredList, setFilteredList] = useState(input_list);
  const displayList = filteredList.map((list) => (
    <div key={list} className="my-1.5 w-4/5 pl-4 text-[#3C3C43]/40">
      {list}
    </div>
  ));
  const findMatches = (wordToMatch) => {
    // 배열 반환
    return input_list.filter((input) => {
      const regex = new RegExp(wordToMatch, "gi");
      return input.match(regex);
    });
  };
  const inputHandler = (input) => {
    setFilteredList(findMatches(input));
  };

  useEffect(() => {
    console.log(filteredList);
    console.log(displayList);
  }, [filteredList]);
  return (
    <main className="flex h-4/5 w-full flex-col items-center justify-center">
      {/* 검색 구역 */}
      <div className="relative flex h-1/3 w-full flex-col items-center justify-center">
        <div className="mb-3 text-xl">어디로 여행을 떠나시나요?</div>
        <div className="flex h-1/5 w-[28%] border-[1px] border-solid border-black">
          <img src={searchIcon} alt="검색 아이콘" className="mx-2 w-[10%]" />
          <input
            type="text"
            placeholder="여행지를 입력해주세요"
            id="region-list"
            className="h-full w-full text-sm"
            onInput={(event) => inputHandler(event.target.value)}
          />
        </div>
        <div
          id="region-list"
          className="flex h-2/5 w-[28%] flex-col items-center overflow-hidden overflow-y-auto border-[1px] border-t-0 border-solid border-black bg-[#F5F5F5] text-sm"
        >
          {displayList}
        </div>
      </div>
      {/* 보여주기 구역 */}
      <div className="flex h-1/6 w-full items-center justify-center">
        여행자들의 픽
      </div>
      <div className="h-1/3 w-full">
        <ul className="flex justify-evenly">          
          {imgContanier}
        </ul>
      </div>
      <div className="h-1/6 w-full">Footer</div>
    </main>
  );
};

export default HomePage;
