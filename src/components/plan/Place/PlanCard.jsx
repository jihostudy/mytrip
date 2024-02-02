import React from "react";

const PlanCard = ({
  index,
  image,
  name,
  city,
  likes,
  period,
  numPeople,
  onClick,
}) => {
  const title = "(" + city + ") " + name;
  const descirption = `${period - 1}박${period}일 | ${numPeople}인 여행`;
  const like = "❤️ " + likes;

  return (
    <li
      onClick={() => onClick(index)}
      className="flex h-[18%] justify-between gap-4 rounded-lg bg-slate-100 p-3 hover:cursor-pointer"
    >
      <img src={image} alt="계획 사진" />
      <div className="grow">
        <p className="mb-1 font-extrabold">{title}</p>
        <p className="text-xs">{descirption}</p>
        <p className="text-xs">{like}</p>
      </div>
    </li>
  );
};

export default PlanCard;
