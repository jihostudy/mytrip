import React from "react";

const Button = ({ text, width, height, bg }) => {
  console.log(height);
  const style = `w-[${width}] h-[${height}] bg-[${bg}] border-[1px] border-solid border-black rounded-lg`;
  return <button className={style}>{text}</button>;
};

export default Button;
