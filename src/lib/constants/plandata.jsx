import React from "react";
// recoil
import { atom } from "recoil";

export const planState = atom({
  key: "planState",
  default: {
    id: null,
    username: null,
    region: null,
    date: { start: null, end: null }, // 시작-끝 날짜
    period: null, //몇일?
    season: null,
    totalCost: null,
    numPeople: null,
    likes: null,
    scraps: null,
    image: null,
    shareURI: null,
    description: null,
    isPublic: null,
    hashTag: [],
    schedule: [], // 방문 장소들
  },
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

  return Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1; // 밀리세컨 * 초 * 분 * 시 = 일
};
export const setEndTime = (startTime, duration) => {
  const hour = startTime.hour;
  const minute = startTime.minute;
  return {
    hour: hour + duration / 2,
    minute: (minute + (duration % 2)) / 60,
  };
};
