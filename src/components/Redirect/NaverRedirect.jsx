import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/API";

import { useRecoilState } from "recoil";
import { user } from "../../lib/constants/userInfo";

const NaverRedirect = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  useEffect(() => {
    async function getToken() {
      try {
        const res = await API.post("/Oauth/naver", {
          code: code,
          state: state,
        });
        console.log(res);
        if (res.status === 200) {
          // 로그인 성공
          localStorage.setItem("accessToken", res.headers.get("Authorization"));
          setUserInfo(() => ({
            isLogin: true,
            username: res.data.username,
          }));

          navigate("/home");
        } else if (res.status === 201) {
          // 첫 구글 로그인
          // localStorage.setItem("accessToken", res.headers.get("Authorization"));

          // username 등록페이지로 이동
          // 토큰을 Params 로 전달
          navigate("/home/auth/new-username", {
            state: { accessToken: res.headers.get("Authorization") },
          });
        } else {
          // 에러
          alert("다시 시도해주세요.");
          navigate("/home/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getToken();
  }, []);

  return (
    <div>
      <p>{code}</p>
      <p>{state}</p>
    </div>
  );
};

export default NaverRedirect;
