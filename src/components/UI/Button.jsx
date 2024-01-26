import React from "react";

const Button = ({ text, width, height }) => {
  const style = `w-[${width}] h-[${height}] border-[1px] border-solid border-black`;
  return <button className={style}>{text}</button>;
};

export default Button;
