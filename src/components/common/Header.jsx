import React, { useEffect, useRef, useState } from "react";
// router
import { Link, useNavigate } from "react-router-dom";
// recoil
import { user } from "../../lib/constants/userInfo";
import { useRecoilState } from "recoil";
// custom hook
import { useDetectClose } from "../../hook/useDetectClose";
import { useConfirmModal } from "../../hook/useConfirmModal";
// images & icons
import myPageBtn from "../../assets/icons/myPage.svg";
const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(user);
  // modal
  const { openModal } = useConfirmModal();
  // dropdown related
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen, toggleDropdown] = useDetectClose(
    dropDownRef,
    false,
  );
  const [dropDownMenu, setDropDownMenu] = useState();

  //styles
  const firstDropdown =
    "relative flex cursor-pointer justify-center border-[1px] border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";
  const Dropdown =
    "relative flex cursor-pointer justify-center border-[1px] border-t-0 border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";

  // Modal
  const logoutHandler = () => {
    console.log("clicked logout");
    localStorage.removeItem("accessToken");
    setUserInfo(() => ({
      isLogin: false,
      username: null,
    }));

    navigate("/home");
  };

  const logoutModalHandler = () => {
    openModal({
      content: "로그아웃 하시겠습니까?",
      callback: logoutHandler,
    });
  };
  // NavBar
  const navBar = !userInfo.isLogin ? (
    <Link to="?" className="m-3 mr-5">
      커뮤니티
    </Link>
  ) : (
    <>
      <Link to="/planning" className="m-3">
        여행 계획
      </Link>
      <Link to="?" className="m-3 mr-5">
        커뮤니티
      </Link>
    </>
  );
  // DropDown
  useEffect(() => {
    userInfo.isLogin
      ? setDropDownMenu(
          <div
            className="absolute right-[-100%] top-[40%] flex w-[300%] flex-col"
            onClick={toggleDropdown}
          >
            <Link to="회원정보" className={firstDropdown}>
              회원정보
            </Link>
            <Link to="나의 여행지" className={Dropdown}>
              나의 여행지
            </Link>
            <Link to="스크랩한 여행지" className={Dropdown}>
              스크랩한 여행지
            </Link>
            <button onClick={logoutModalHandler} className={Dropdown}>
              로그아웃
            </button>
          </div>,
        )
      : setDropDownMenu(
          <div
            className="absolute right-[-50%] top-[40%] flex w-[200%] flex-col"
            onClick={toggleDropdown}
          >
            <Link to="/home/auth/login" className={firstDropdown}>
              로그인
            </Link>
            <Link to="/home/auth/signup" className={Dropdown}>
              회원가입
            </Link>
          </div>,
        );
  }, [userInfo.isLogin]);
  return (
    <header className="sticky z-10 flex h-1/5 w-full justify-between bg-gradient-to-b from-[#38C3FF] from-0% via-[#cde3ed94] via-60% to-[#d9d9d900] to-100%">
      <Link to="/home" className="relative left-[2%] top-[13%] ml-3">
        {/* <img src="" alt="Home" className="m-3" /> */}
        이방인
      </Link>

      <nav className="relative right-[4%] top-[13%] mr-3 flex w-1/4 justify-end">
        {navBar}
        <div className="relative cursor-pointer" ref={dropDownRef}>
          <img src={myPageBtn} alt="설정" onClick={toggleDropdown} />
          {isOpen && dropDownMenu}
        </div>
      </nav>
    </header>
  );
};

export default Header;
