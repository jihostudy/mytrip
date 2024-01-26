import React from "react";

const Button = ({ txt, w, h, bg }) => {
  console.log(bg);
  const style = `${width} ${height} ${bg} border-[1px] border-solid border-black rounded-lg`;

  return <button className={style}>{txt}</button>;
};

export default Button;
