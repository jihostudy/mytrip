import React from "react";

const PlanCard = ({ image, name, city, likes, period, numPeople }) => {
  const title = "(" + city + ") " + name;
  const descirption = `${period - 1}박${period}일 | ${numPeople}인 여행`;
  const like = "❤️ " + likes;

  return (
    <li
      // onClick={() => console.log("click")}
      className="flex h-[18%] justify-between gap-4 bg-slate-100 p-3"
    >
      <img src={image} alt="계획 사진" />
      <div className="grow">
        <p>{title}</p>
        <p>{descirption}</p>
        <p>{like}</p>
      </div>
    </li>
  );
};

export default PlanCard;
