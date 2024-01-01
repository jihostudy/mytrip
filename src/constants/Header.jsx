import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between">
      <div className="flex">
        <img src="" alt="로고" className="" />
        <ul className="flex justify-center">
          <Link to="?">여행지</Link>
          <Link to="?">여행만들기</Link>
          <Link to="?">이용방법</Link>
        </ul>
      </div>
      <div className="">
        <Link to="/login">로그인</Link>
        <Link>회원가입</Link>
      </div>
    </header>
  );
};

export default Header;
