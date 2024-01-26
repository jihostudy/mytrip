import React from "react";

const Button = ({ text, width, height, bg }) => {
  console.log(bg);
  const style = `${width} ${height} ${bg} border-[1px] border-solid border-black rounded-lg`;

  return <button className={style}>{text}</button>;
};

export default Button;
