import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between">
      <div className="flex">
        <Link to="/">
          <img src="" alt="Home" className="m-3" />
        </Link>
        <ul className="flex justify-center">
          <Link to="?" className="m-3">
            여행지{" "}
          </Link>
          <Link to="?" className="m-3">
            여행만들기{" "}
          </Link>
          <Link to="?" className="m-3">
            이용방법{" "}
          </Link>
        </ul>
      </div>
      <div className="m-3">
        <Link to="/login" className="m-3">
          로그인
        </Link>
        <Link className="m-3">회원가입</Link>
      </div>
    </header>
  );
};

export default Header;
