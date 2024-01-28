import React from "react";

const TimeLine = ({ time }) => {
  return (
    <li className="border-b-1 flex min-h-[12.5%] w-full items-center justify-start border-solid border-[#CBC8C8]">
      {time}
    </li>
  );
};

export default TimeLine;
