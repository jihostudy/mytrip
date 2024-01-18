import React, { useEffect } from "react";
// axios
import { API } from "../../api/API";
// router
import { useNavigate } from "react-router-dom";
// recoil
import { useRecoilState } from "recoil";
import { user } from "../../lib/constants/userInfo";
const KakaoRedirect = () => {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const navigate = useNavigate();
  useEffect(() => {
    // 인가코드 추출
    const authCode = new URL(window.location.href).searchParams.get("code");
    console.log(authCode);
    const sendAuthCode = async () => {
      try {
        const res = await API.post("/auth/kakao", null, {
          params: {
            code: authCode,
          },
        });
        console.log("res는 왔습니다");
        console.log(res);
        console.log(res.data);
        const statusCode = res.status;
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
            console.log("200 success");
            navigate("/home");
            break;
          // 첫 로그인
          case 201:
            navigate("/home/auth/new-username", {
              state: { accessToken: res.headers.get("Authorization") },
            });
            console.log("201 success");

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
