import React from "react";
// recoil
import { atom } from "recoil";

// planPlace
export const defaultPlanState = {
  id: null,
  region: null,
  title: null,
  description: null,
  image: null,
  date: { start: null, end: null }, // 시작-끝 날짜
  period: null, //몇일?
  totalCost: null,
  numPeople: null,
  likes: null,
  scraps: null,
  shareURI: null,
  isPublic: true,
  isDone: false,
  schedule: [], // 방문 장소들
  destinationCart: [], //보관함
  //hashTag: [],
};
export const loadedPlanState = atom({
  key: "loadedPlanState",
  default: defaultPlanState,
});
export const loadedCurrDate = atom({
  key: "loadedCurrentDate",
  default: {
    currDate: 1,
  },
});

// planTimeTable
export const planState = atom({
  key: "planState",
  default: defaultPlanState,
});
export const currDate = atom({
  key: "currentDate",
  default: {
    currDate: 1,
  },
});

export const getDateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
};
export const setEndTime = (startTime, duration) => {
  const convertedTime = startTime.hour + startTime.minute / 60.0;
  const convertedDuration = duration / 2.0;
  const convertedResult = convertedTime + convertedDuration;
  return {
    hour: Math.floor(convertedResult),
    minute: (convertedResult - Math.floor(convertedResult)) * 60,
  };
};
