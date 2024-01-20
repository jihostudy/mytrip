import React, { useRef, useState } from "react";
// axios
import { API } from "../api/API";
// router
import { useLocation, useNavigate } from "react-router-dom";
// recoil
import { useRecoilState } from "recoil";
import { user } from "../lib/constants/userInfo";

const NewUserNamePage = () => {
  const [usernameCheck, setUsernameCheck] = useState(false);

  const userNameRef = useRef();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(user);

  // 전달받은 토큰
  const { state } = useLocation();
  const token = state.accessToken;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const username = userNameRef.current.value;

    localStorage.setItem("accessToken", token);
    console.log(token);
    console.log(username);

    // 첫 소셜 로그인일 때, username 등록 api
    async function updateUsername(username) {
      try {
        const res = await API.post(
          "/auth/updateUsername",
          { username: username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // 성공하면 전역변수 변경 후 메인으로 Redirect
        if (res.status === 200) {
          setUserInfo(() => ({
            isLogin: true,
            username: username,
          }));

          console.log(res.headers.get("Authorization"));
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", res.headers.get("Authorization"));

          navigate("/home");
        } else {
          localStorage.removeItem("accessToken");
          alert("다시 시도해주세요!!");
        }
      } catch (error) {
        // 실패하면 로그인 불가능
        localStorage.removeItem("accessToken");
        console.log(error);
        alert("다시 시도해주세요.");
      }
    }

    updateUsername(username);

    // 성공하면 토큰 저장, 전역변수에 username 저장

    // 에러핸들링 (중복 등...)

    // /home으로 이동
  };

  const checkHandler = async () => {
    const value = userNameRef.current.value;
    if (value.trim().length === 0) {
      alert("닉네임을 입력해주세요");
      return;
    }

    try {
      const res = await API.post("/auth/verify/username", { username: value });
      console.log(res);
      if (res.data.message === "Valid username") {
        setUsernameCheck(true);
      }
    } catch (error) {
      alert("다시 시도해주세요");
      console.log(error);
    }
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            ref={userNameRef}
            type="text"
            className="bg-orange-300"
            placeholder="username"
          />
          <button
            type="button"
            className="rounded bg-orange-200 text-sm"
            onClick={checkHandler}
          >
            중복 검사
          </button>
        </div>
        <button type="submit" className="border-2 border-red-800">
          제출
        </button>
      </form>
    </div>
  );
};

export default NewUserNamePage;
