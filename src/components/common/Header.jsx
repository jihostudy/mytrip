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
      // email: null,
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
  // background: linear-gradient(180deg, #38C3FF 0%, #c9e7f4c9 60%, #cde3ed94 70.5%, #d9d9d900 100%);
  return (
    <header className="sticky flex h-1/5 w-full justify-between bg-gradient-to-b from-[#38C3FF] from-0% via-[#cde3ed94] via-60% to-[#d9d9d900] to-100%">
      <div className="flex">
        <Link to="/home">
          <img src="" alt="Home" className="m-3" />
        </Link>
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
