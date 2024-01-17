import React from "react";
// router
import { Link, useNavigate } from "react-router-dom";
// recoil
import { user } from "../../lib/constants/userInfo";
import { useRecoilState } from "recoil";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("clicked logout");
    localStorage.removeItem("accessToken");
    setUserInfo(() => ({
      isLogin: false,
      username: null,
      email: null,
    }));
    navigate("/home");
  };
  const navBar = !userInfo.isLogin ? (
    <>
      <Link to="/home/auth/login" className="m-3">
        로그인
      </Link>
      <Link to="/home/auth/signup" className="m-3">
        회원가입
      </Link>
    </>
  ) : (
    <>
      <Link to="나의 여행지" className="m-3">
        {userInfo.username}의 여행지
      </Link>
      <button onClick={logoutHandler}>로그아웃</button>
    </>
  );

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
      <nav className="m-3">
        {navBar}
        <Link to="?" className="m-3">
          커뮤니티
        </Link>
      </nav>
    </header>
  );
};

export default Header;
