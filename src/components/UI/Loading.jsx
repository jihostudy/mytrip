import React from "react";
// image & icons
import Spinner from "../../assets/icons/gif/spinner.gif";
const Loading = () => {
  return (
    <>
      <img src={Spinner} alt="로딩중" className="absolute top-0 border-none" />
    </>
  );
};

export default Loading;
