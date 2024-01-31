import React from "react";

const Button = ({ txt, width, height, bg, custom, clickHandler }) => {
  console.log(bg);
  const style = `${width} ${height} ${bg} border-[1px] border-solid border-black rounded-lg `;

  return (
    <button className={style + custom} onClick={clickHandler}>
      {txt}
    </button>
  );
};

export default Button;
