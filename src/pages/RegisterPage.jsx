import React, { useEffect, useRef, useState } from "react";
// router
import { useNavigate } from "react-router-dom";
// axios
import { API } from "../api/API";
// icons & images
import visibleIcon from "../assets/icons/visible.svg";
import invisibleIcon from "../assets/icons/invisible.svg";
const RegisterPage = () => {
  // styles
  const buttonClasses =
    "relative right-3 h-[140%] rounded-lg border-[1px] border-solid border-black";
  const labelClasses = "col flex items-center justify-start font-bold";
  const [trueGuideStyle, setTrueGuideStyle] = useState(
    "col-span-3 flex items-center text-xs text-[#38C3FF]",
  );
  const [falseGuideStyle, setFalseGuideStyle] = useState(
    "col-span-3 flex items-center text-xs text-[#EB4315]",
  );

  const [usernameValidate, setUsernameValidate] = useState({
    confirmed: false,
    confirmed_username: null,
    message: null,
  });
  const [emailValidate, setEmailValidate] = useState({
    confirmed: false,
    confirmed_email: null,
    message: null,
  });
  const [passwordValidate, setPasswordValidate] = useState({
    confirmed: false,
    message: null,
  });
  const [showPassword, setShowPassword] = useState({
    origin: false,
    confirm: false,
  });

  // 가이드
  const usernameGuide = usernameValidate.confirmed ? (
    <p className={trueGuideStyle}>{usernameValidate.message}</p>
  ) : (
    <p className={falseGuideStyle}>{usernameValidate.message}</p>
  );

  const emailGuide = emailValidate.confirmed ? (
    <p className={trueGuideStyle}>{emailValidate.message}</p>
  ) : (
    <p className={falseGuideStyle}>{emailValidate.message}</p>
  );
  const passwordGuide = passwordValidate.confirmed ? (
    <p className={trueGuideStyle}>{passwordValidate.message}</p>
  ) : (
    <p className={falseGuideStyle}>{passwordValidate.message}</p>
  );
  const [email, setEmail] = useState(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();

  // 회원가입
  const registerHandler = async (event) => {
    event.preventDefault();

    if (!usernameValidate.confirmed || !emailValidate.confirmed) {
      // 애니메이션 필요 자리
      alert("이메일과 닉네임 확인하세요");
      return;
    }

    const username = userNameRef.current.value;
    const password = passwordRef.current.value;

    // 0. 닉네임 & 이메일 중복 검사 후 바꿨는지 검사
    if (
      usernameValidate.confirmed_username != username ||
      emailValidate.confirmed_email != email
    ) {
      if (usernameValidate.confirmed_username != username) {
        setUsernameValidate({
          confirmed: false,
          confirmed_username: null,
          message: "닉네임 중복검사를 다시해주세요.",
        });
      }
      if (emailValidate.confirmed_email != email) {
        setEmailValidate({
          confirmed: false,
          confirmed_email: null,
          message: "이메일 중복검사를 다시해주세요.",
        });
      }
      return;
    }

    // 1. 비번 형식 확인됬는지
    if (!passwordValidate.confirmed) {
      return;
    }

    // 2. 서버로 전송
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("accessToken", res.headers.get("Authorization"));
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요");
    }
  };

  // 중복 검사
  const checkHandler = async (item) => {
    let postUrl;
    let registerInput;
    const username = userNameRef.current.value;
    if (item === "username") {
      if (username.trim().length === 0) {
        setUsernameValidate({
          confirmed: false,
          confirmed_username: null,
          message: "닉네임을 입력해주세요.",
        });
        return;
      }

      postUrl = "/auth/verify/username";
      registerInput = { username: username };
    } else {
      if (!emailValidate.confirmed) {
        // 애니메이션 필요 자리
        return;
      }
      postUrl = "/auth/verify/email";
      registerInput = { email: email };
    }

    try {
      const res = await API.post(postUrl, registerInput);
      console.log(res);
      if (res.data.message === "Valid username") {
        setUsernameValidate({
          confirmed: true,
          confirmed_username: username,
          message: "사용가능한 닉네임입니다.",
        });
      } else if (res.data.message === "Valid email") {
        setEmailValidate({
          confirmed: true,
          confirmed_email: email,
          message: "사용가능한 이메일입니다.",
        });
      }
    } catch (error) {
      const errorStatus = error.response.status;
      const errorMessage = error.response.data.message;
      if (errorStatus === 409) {
        if (errorMessage === "Username already exists") {
          setUsernameValidate({
            confirmed: false,
            confirmed_username: null,
            message: "이미 사용중인 닉네임입니다.",
          });
        } else if (errorMessage === "Email already exists") {
          setEmailValidate({
            confirmed: false,
            confirmed_email: null,
            message: "이미 사용중인 이메일입니다.",
          });
        }
      } else if (errorStatus === 500) {
        alert("Internal Server Error!");
        navigate("/home");
      }
    }
  };
  // 이메일 형식 검사
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  function validateEmail(email) {
    setEmail(email);
    if (emailRegex.test(email) === false) {
      setEmailValidate({
        confirmed: false,
        confirmed_email: null,
        message: "이메일 형식이 올바르지 않습니다.",
      });
      return;
    }
    setEmailValidate((prev) => ({
      ...prev,
      confirmed: true,
      message: null,
    }));
  }
  // 비밀번호 형식 검사
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/;
  function validatePassword(password) {
    if (!passwordRegex.test(password)) {
      setPasswordValidate({
        confirmed: false,
        message: "비밀번호 기준에 맞게 다시 입력해주세요.",
      });
    } else {
      setPasswordValidate({
        confirmed: true,
        message: null,
      });
    }
  }
  // 비밀번호 보이기
  function showPasswordHandler(value) {
    setShowPassword((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  }
  useEffect(() => {
    console.log(showPassword);
  }, [showPassword]);
  return (
    <div className="relative top-[15%] flex h-4/5 w-full flex-col items-center">
      <form
        className="flex w-[45%] min-w-[485px] justify-between"
        onSubmit={(e) => registerHandler(e)}
      >
        {/* 왼쪽 */}
        <div className="relative grid w-5/6 grid-cols-[30fr_55fr_13fr] grid-rows-8 gap-y-2">
          {/* 닉네임 */}
          <label className={labelClasses}>닉네임</label>
          <input
            type="text"
            ref={userNameRef}
            placeholder="입력해주세요"
            className="w-3/4"
          />

          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("username")}
          >
            중복 확인
          </button>
          {usernameGuide}
          {/* 이메일 */}
          <label className={labelClasses}>이메일</label>
          <input
            type="text"
            placeholder="입력해주세요"
            onChange={(e) => validateEmail(e.target.value)}
            className="w-3/4"
          />
          <button
            type="button"
            className={buttonClasses}
            onClick={() => checkHandler("email")}
          >
            중복 확인
          </button>
          {emailGuide}
          {/* 비밀번호 */}
          <label className={labelClasses}>비밀번호</label>
          <input
            type={showPassword.origin ? "text" : "password"}
            ref={passwordRef}
            placeholder="입력해주세요"
            className="w-3/5"
            onBlur={(e) => validatePassword(e.target.value)}
          />
          <button onClick={() => showPasswordHandler("origin")} type="button">
            <img
              src={showPassword.origin ? visibleIcon : invisibleIcon}
              alt="보기"
            />
          </button>
          {/* 비밀번호 확인 */}
          <label className={labelClasses}>비밀번호 확인</label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            ref={confirmPasswordRef}
            placeholder="입력해주세요"
            className="w-3/5"
          />
          <button onClick={() => showPasswordHandler("confirm")} type="button">
            <img
              src={showPassword.confirm ? visibleIcon : invisibleIcon}
              alt="보기"
            />
          </button>
          {passwordGuide}
          <p className="col-span-3 text-[14px] text-[#00000040]">
            ※최소 8자 이상 ※최소 1개의 대문자 & 특수문자 & 숫자 사용
          </p>
        </div>
        {/* 오른쪽 */}
        <div className="relative h-full w-[13%]">
          <button className="aspect-square w-full rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]">
            회원가입
          </button>
        </div>
      </form>
      {/* 아래 */}
      <div className="mt-2 flex w-[45%] min-w-[485px] justify-between">
        <div className="aspect-square w-[20px] rounded-md border-4 border-solid border-[#EB4315]" />
        <p className="flex w-11/12 items-center">
          이용약관 및 개인정보 수집 및 이용에 모두 동의합니다.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
