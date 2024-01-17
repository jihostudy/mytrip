import React, { useEffect } from "react";
// axios
import { API } from "../../api/API";
// recoil
import { useRecoilState } from "recoil";
import { user } from "../../lib/constants/userInfo";
const KakaoRedirect = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);

  useEffect(() => {
    // 인가코드 추출
    const authCode = new URL(window.location.href).searchParams.get("code");

    const sendAuthCode = async () => {
      try {
        const res = await API.post("/auth/kakao", {
          params: {
            code: authCode,
          },
        });
        console.log(res.data);
        const statusCode = error.response.status;
        switch (statusCode) {
          // 정상적 로그인
          case 200:
            localStorage.setItem(
              "accessToken",
              res.headers.get("Authorization"),
            );
            setUserInfo(() => ({
              isLogin: true,
              username: res.data.username,
            }));
            Navigate("/home");
            break;
          // 첫 로그인
          case 201:
            navigate("/home/auth/new-username", {
              state: { accessToken: res.headers.get("Authorization") },
            });
            break;
          default:
            // 에러
            alert("다시 시도해주세요.");
            navigate("/home/auth/login");
        }
      } catch (error) {
        // 실패
        console.log(error);
      }
    };
    sendAuthCode();
  }, []);
  return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirect;
