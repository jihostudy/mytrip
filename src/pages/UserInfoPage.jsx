import React, { useEffect, useRef, useState } from "react";

// API
import { API } from "../api/API";

// recoil
import { user } from "../lib/constants/userInfo";
import { useRecoilState } from "recoil";

// icon
import NameChangeIcon from "../assets/icons/NameChange.svg?react";

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [isNameChange, setIsNameChange] = useState(false);

  // ref
  const usernameRef = useRef();

  // username handler
  async function nameCheckHandler() {
    console.log("중복 체크");
    try {
      const res = await API.post("/auth/verify/username", {
        username: usernameRef.current.value,
      });
      const status = res.status;
      if (status === 200) {
        // 사용 가능한 닉네임
      }
      console.log(status);
    } catch (e) {
      //
      const status = e.response.status;
      console.log(status);
      if (status === 409) {
        // 중복된 닉네임
      } else {
        // 서버 오류
      }
    }
  }
  async function nameChangeHandler() {
    console.log("닉네임 변경");
    try {
      const res = await API.post("/auth/updateUsername", {
        username: usernameRef.current.value,
      });
      const status = res.status;
      if (status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", res.headers.get("Authorization"));
        setUserInfo(() => ({
          isLogin: true,
          username: usernameRef.current.value,
        }));
        // 닉네임 변경 완료
      }
    } catch (e) {
      const status = e.response.status;
      if (status === 500) {
        // 서버 오류
      } else {
        console.log("서버 오류");
      }
    }
  }

  // password handler

  // delete account handler

  // 유저 정보 저장
  useEffect(() => {
    // async function getInfo() {
    //   try {
    //     const res = await API.get("/my-page/profile");
    //     const data = { email: res.data.email, username: res.data.username };
    //     setUserInfo(data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // getInfo();
  }, []);
  // console.log(userInfo);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 닉네임 변경 */}
      <div className="flex justify-center">
        <p>닉네임</p>
        {!isNameChange ? (
          <>
            <p>{userInfo.username}</p>
            <NameChangeIcon
              onClick={() => setIsNameChange((prev) => !prev)}
              className="hover:cursor-pointer"
            />
          </>
        ) : (
          <>
            <input placeholder="입력해주세요" ref={usernameRef} />
            <button onClick={nameCheckHandler}>중복확인</button>
            <button onClick={nameChangeHandler}>확인</button>
          </>
        )}
      </div>
      {/* 이메일 표시 */}
      <div>이메일</div>
      {/* 비밀번호 변경 */}
      <div>비밀번호</div>
      {/* 회원 탈퇴 */}
      <div>회원탈퇴</div>
    </div>
  );
};

export default UserInfoPage;
