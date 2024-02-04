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
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiUserCircle } from "react-icons/hi2";
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
    "relative bg-white flex cursor-pointer justify-center border-[1px] border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";
  const Dropdown =
    "relative bg-white flex cursor-pointer justify-center border-[1px] border-t-0 border-solid border-black p-2 text-xs hover:bg-[#D5D7DB]";

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
    <Link to="?" className="m-3">
      커뮤니티
    </Link>
  ) : (
    <>
      <Link to="/home/my-posts" className="m-3">
        여행 계획
      </Link>
      <Link to="?" className="m-3">
        커뮤니티
      </Link>
    </>
  );
  // DropDown
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    userInfo.isLogin
      ? setDropDownMenu(
          <div
            className="absolute right-[-36%] top-[155%] flex w-[168%] flex-col"
            onClick={toggleDropdown}
          >
            <Link to="회원정보" className={firstDropdown}>
              회원정보
            </Link>
            <Link to="/home/my-posts" className={Dropdown}>
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
            className="absolute right-[-36%] top-[155%] flex w-[168%] flex-col"
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
    <header className="sticky z-10 flex h-[12.8dvh] w-full items-center justify-center bg-gradient-to-b from-[#38C3FF] from-0% via-[#38c3ff80] via-30% to-[#c6c6c600] to-100%">
      <div className="flex h-full w-[93%] items-center justify-between">
        <Link to="/home">
          {/* <img src="" alt="Home" className="m-3" /> */}
          이방인
        </Link>

        <nav className="relative flex w-[18.1%] items-center justify-end">
          {navBar}
          <div
            className="relative flex w-[26.7%] cursor-pointer justify-center"
            ref={dropDownRef}
          >
            {isHover ? (
              <HiUserCircle
                onClick={toggleDropdown}
                style={{ height: "80%", width: "70%", color: "#000000" }}
                onMouseLeave={() => setIsHover(false)}
              />
            ) : (
              <HiOutlineUserCircle
                onClick={toggleDropdown}
                style={{ height: "80%", width: "70%", color: "#000000" }}
                onMouseEnter={() => setIsHover(true)}
              />
            )}

            {/* <img src={myPageBtn} alt="설정" onClick={toggleDropdown} /> */}
            {isOpen && dropDownMenu}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
