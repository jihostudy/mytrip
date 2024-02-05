import React, { useState, useEffect } from "react";

// components
import PlaceCard from "./PlaceCard";

// UI
import Button from "../../UI/Button";
import { fi } from "date-fns/locale";

// Cataegory
const categoryList = ["추천 장소", "맛집", "카페", "숙소"];

const SCROLL_NUMS = 20;

const SelectPlace = ({ saveClickHandler, filteredList }) => {
  const [isClick, setIsClick] = useState(0);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollList, setScrollList] = useState([]);

  const categoryBtnStyle = "px-1";
  const categoryBtnStyle_clicked = "px-1 + bg-[#ffcb16]";

  function clickHandler(index) {
    // 클릭 시 색상 변경
    setIsClick(index);
    // 카테고리 기능 추가
  }

  // 무한 스크롤
  useEffect(() => {
    setPage(0);

    const len = filteredList.length;
    if (len < SCROLL_NUMS) {
      setScrollList(filteredList.slice(0, len));
    } else {
      setScrollList(filteredList.slice(0, SCROLL_NUMS));
    }
  }, [filteredList]);

  function handleObserver(entries) {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      console.log("observe");
      setPage((prevPage) => prevPage + 1);
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    // console.log(page);
    setIsLoading((prev) => !prev);
    console.log("스크롤!!");
    // 데이터 추가
    const start = page * SCROLL_NUMS;
    const finish = start + SCROLL_NUMS;
    const last = filteredList.length;
    if (start >= last) {
      setIsLoading((prev) => !prev);
      return;
    }

    let list = [];
    if (finish > last) {
      list = filteredList.slice(start, last);
    } else {
      list = filteredList.slice(start, finish);
    }
    console.log(list);

    setScrollList((prev) => [...prev, ...list]);

    setIsLoading((prev) => !prev);
  }, [page]);

  return (
    <>
      {/* 카테고리 */}
      <div className="flex h-[8%] gap-3 pb-2">
        {categoryList.map((item, index) => {
          return (
            <Button
              key={item}
              txt={item}
              clickHandler={() => clickHandler(index)}
              custom={
                index === isClick ? categoryBtnStyle_clicked : categoryBtnStyle
              }
            />
          );
        })}
        {/* <Button txt="추천 장소" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="맛집" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="카페" clickHandler={clickHandler} custom={"px-1"} />
        <Button txt="숙소" clickHandler={clickHandler} custom={"px-1"} /> */}
      </div>
      {/* 장소 리스트 */}
      <ul className="flex h-[90%] flex-col gap-2 overflow-hidden overflow-y-auto">
        {scrollList.map((placeData, index) => (
          <PlaceCard
            key={index}
            placeData={placeData}
            saveClickHandler={saveClickHandler}
          />
        ))}
        {/* {isLoading && <p>Loading...</p>} */}
        <div id="observer" className="block h-3">
          &nbsp;
        </div>
      </ul>
    </>
  );
};

export default SelectPlace;
