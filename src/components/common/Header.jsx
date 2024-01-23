import React, { useEffect, useState } from "react";
// router
import { Link, useNavigate } from "react-router-dom";
// recoil
import { user } from "../../lib/constants/userInfo";
import { useRecoilState } from "recoil";
// modal hook
import { useConfirmModal } from "../../hook/useConfirmModal";
// images & icons
import myPageBtn from "../../assets/icons/myPage.svg";
const Header = () => {
  const navigate = useNavigate();
  const { openModal } = useConfirmModal();
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [menuBar, setMenuBar] = useState({
    isOpen: false,
    menu: null,
  });
  function menubarHandler() {
    setMenuBar((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }
  //styles
  const menuFirstStyle =
    "relative flex cursor-pointer justify-center border-[1px] border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";
  const menuStyle =
    "relative flex cursor-pointer justify-center border-[1px] border-t-0 border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";
  useEffect(() => {
    userInfo.isLogin
      ? setMenuBar({
          isopen: false,
          menu: (
            <div className="absolute right-[-100%] top-[40%] flex w-[300%] flex-col">
              <Link
                to="회원정보"
                className={menuFirstStyle}
                onClick={menubarHandler}
              >
                회원정보
              </Link>
              <Link
                to="나의 여행지"
                className={menuStyle}
                onClick={menubarHandler}
              >
                나의 여행지
              </Link>
              <Link
                to="스크랩한 여행지"
                className={menuStyle}
                onClick={menubarHandler}
              >
                스크랩한 여행지
              </Link>
              <button onClick={logoutModalHandler} className={menuStyle}>
                로그아웃
              </button>
            </div>
          ),
        })
      : setMenuBar({
          isopen: false,
          menu: (
            <div className="absolute right-[-50%] top-[40%] flex w-[200%] flex-col">
              <Link
                to="/home/auth/login"
                className={menuFirstStyle}
                onClick={menubarHandler}
              >
                로그인
              </Link>
              <Link
                to="/home/auth/signup"
                className={menuStyle}
                onClick={menubarHandler}
              >
                회원가입
              </Link>
            </div>
          ),
        });
  }, [userInfo.isLogin]);
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

  const logoutModalHandler = () => {
    menubarHandler();
    openModal({
      content: "로그아웃 하시겠습니까?",
      callback: logoutHandler,
    });
  };

  const navBar = !userInfo.isLogin ? (
    <Link to="?" className="m-3 mr-5">
      커뮤니티
    </Link>
  ) : (
    <>
      <Link to="나의 여행지" className="m-3">
        {userInfo.username}의 여행지
      </Link>
      <Link to="?" className="m-3 mr-5">
        커뮤니티
      </Link>
    </>
  );
  // background: linear-gradient(180deg, #38C3FF 0%, #c9e7f4c9 60%, #cde3ed94 70.5%, #d9d9d900 100%);
  return (
    <header className="sticky z-10 flex h-1/5 w-full justify-between bg-gradient-to-b from-[#38C3FF] from-0% via-[#cde3ed94] via-60% to-[#d9d9d900] to-100%">
      <Link to="/home" className="relative left-[2%] top-[13%] ml-3">
        {/* <img src="" alt="Home" className="m-3" /> */}
        이방인
      </Link>

      <nav className="relative right-[4%] top-[13%] mr-3 flex w-1/4 justify-end">
        {navBar}
        <div className="relative cursor-pointer" onBlur={menubarHandler}>
          <img
            src={myPageBtn}
            alt="설정"
            onClick={() => {
              setMenuBar((prev) => ({
                ...prev,
                isOpen: !prev.isOpen,
              }));
            }}
          />
          {menuBar.isOpen && menuBar.menu}
        </div>
      </nav>
    </header>
  );
};

export default Header;
