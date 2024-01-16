import React, { useEffect } from "react";
// axios
import { API } from "../../lib/API";
// router
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// recoil
import { useRecoilState } from "recoil";
import { user } from "../../lib/constants/userInfo";
const TokenRender = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const navigate = useNavigate();
  const currentURL = useLocation();

  useEffect(() => {
    console.log("실행됨");
    const refresher = async () => {
      try {
        const res = await API.get("/refresh");
        setUserInfo(() => ({
          isLogin: true,
          username: res.data.username,
        }));
        if (currentURL.pathname === "/") {
          navigate("/home");
        }
        return 0;
      } catch (error) {
        const errorResponse = error.response;
        const statusCode = errorResponse.status;
        switch (statusCode) {
          case 403:
            // AT 재발급 (프론트: 재로그인 요청)
            if (errorResponse.data.message === "Renewed expired access token") {
              localStorage.setItem(
                "accessToken",
                errorResponse.headers.get("Authorization"),
              );
              console.log("Refresh Token으로 Access Token 재발급");
              return 1;
            }
            // AT RT 유효x (프론트: 미로그인 상태)
            else if (errorResponse.data.message === "Authentication required") {
              console.log("access token, refresh token 없음");
              setUserInfo((prev) => ({
                isLogin: false,
                username: null,
              }));
              navigate("/home");
            }
            break;

          case 404:
            // AT RT 해킹 우려 (프론트: 미로그인 상태)
            console.log("User not found");
            setUserInfo((prev) => ({
              isLogin: false,
              username: null,
            }));
            break;
        }
        return 0;
      }
    };
    // 재로그인
    const refreshAgain = refresher();
    if (refreshAgain) {
      refresher();
    }
  }, []);

  return <Outlet />;
};

export default TokenRender;
