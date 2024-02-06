import React, { useRef, useState } from "react";

// API
import { API } from "../api/API";

//recoil
import { user } from "../lib/constants/userInfo";
import { useRecoilState } from "recoil";

// icon
import visibleIcon from "../assets/icons/visible.svg";
import inVisibleIcon from "../assets/icons/invisible.svg";
import { useNavigate } from "react-router-dom";

// message
const INVALID_PASSWORD_MESSAGE = "비밀번호 기준에 맞게 다시 입력해주세요";

const ChangePasswordPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [userInfo, setUserInfo] = useRecoilState(user);

  const newPwRef = useRef();
  const confirmPwRef = useRef();

  const navigate = useNavigate();

  // sns 로그인 여부는 이전페이지에 로직 만들기

  // password change handler
  async function changeHandler() {
    const newPw = newPwRef.current.value;
    const confirmPw = confirmPwRef.current.value;

    if (!isValid) {
      alert("비밀번호 형식이 맞지 않습니다.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("비밀번호가 다릅니다.");
      return;
    }

    try {
      const res = await API.post("/my-page/profile", {
        username: userInfo.username,
        password: newPw,
      });
      const status = res.status;
      if (status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", res.headers.get("Authorization"));
        navigate("/home/auth/userInfo");
      }
    } catch (error) {
      const status = error.response.status;
      alert("다시 시도해주세요");
      console.log(status, "server error");
    }
  }

  // password visible handler
  function iconClickHandler(option) {
    if (option === "new") {
      setIsVisible((prev) => !prev);
    } else if (option === "confirm") {
      setIsConfirmVisible((prev) => !prev);
    }
  }

  // password validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/;
  function validatePassword(password) {
    if (!passwordRegex.test(password)) {
      // 비밀번호 형식 틀림
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }
  return (
    <div className=" flex h-[50%] items-center justify-center">
      <div className="flex h-full w-[40%] flex-col items-center justify-center gap-2">
        <div className="flex h-[7%] w-full justify-start gap-2">
          <p className="flex w-[20%] items-center">새 비빌번호</p>
          <input
            type={isVisible ? "text" : "password"}
            className="w-[60%]"
            placeholder="입력해주세요"
            ref={newPwRef}
            onChange={(e) => validatePassword(e.target.value)}
          />
          <button onClick={() => iconClickHandler("new")}>
            <img
              src={isVisible ? visibleIcon : inVisibleIcon}
              className="hover:cursor-pointer"
            />
          </button>
        </div>
        <div className="flex h-[7%] w-full justify-start gap-2">
          <p className="flex w-[20%] items-center">비밀번호 확인</p>
          <input
            type={isConfirmVisible ? "text" : "password"}
            className="w-[60%]"
            placeholder="입력해주세요"
            ref={confirmPwRef}
          />
          <button onClick={() => iconClickHandler("confirm")}>
            <img
              src={isConfirmVisible ? visibleIcon : inVisibleIcon}
              className="hover:cursor-pointer"
            />
          </button>
        </div>
        {/* 확인 문구 */}
        <div className="flex w-full flex-col justify-start gap-2">
          {isValid ? (
            <p>&nbsp;</p>
          ) : (
            <p className="text-xs text-[#EB4315]">{INVALID_PASSWORD_MESSAGE}</p>
          )}
          <p className="col-span-3 text-[14px] text-[#00000040]">
            ※최소 8자 이상 ※최소 1개의 대문자 & 특수문자 & 숫자 사용
          </p>
        </div>
      </div>
      <div className="flex h-[20%] w-[7%] items-center">
        <button
          onClick={changeHandler}
          className="mb-4 aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
        >
          변경
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
