import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed flex w-full justify-between border-b border-solid">
      <div className="flex">
        <Link to="/home">
          <img src="" alt="Home" className="m-3" />
        </Link>
        <ul className="flex justify-center">
          <Link to="/planning" className="m-3">
            여행만들기{" "}
          </Link>
        </ul>
      </div>
      <div className="m-3">
        <Link to="/home/auth/login" className="m-3">
          로그인중
        </Link>
        <Link to="/home/auth/signup" className="m-3">
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
