import React, { useEffect, useState } from "react";

// API
import { API } from "../api/API";

// icon
import NameChangeIcon from "../assets/icons/NameChange.svg?react";

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState({ email: "", username: "" });
  const [isNameChange, setIsNameChange] = useState(false);

  // username handler

  // password handler

  // delete account handler

  // 유저 정보 저장
  useEffect(() => {
    async function getInfo() {
      try {
        const res = await API.get("/my-page/profile");
        const data = { email: res.data.email, username: res.data.username };
        setUserInfo(data);
      } catch (e) {}
    }

    getInfo();
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
            <input placeholder="입력해주세요" />
            <button>중복확인</button>
            <button>확인</button>
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
