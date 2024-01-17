import React, { useEffect } from "react";
// axios
import { API } from "../../lib/API";
const KakaoRedirect = () => {
  useEffect(() => {
    // 인가코드 추출
    let authCode = new URL(window.location.href).searchParams.get("code");

    const sendAuthCode = async () => {
      try {
        const res = await API.post({
          params: {
            code: authCode,
          },
        });
        const statusCode = error.response.status;
        switch (statusCode) {
          // 정상적 로그인
          case 200:
            localStorage.setItem(
              "accessToken",
              res.headers.get("Authorization"),
            );
            break;
          // 첫 로그인
          case 201:
            localStorage.setItem(
              "accessToken",
              res.headers.get("Authorization"),
            );
            break;
          default:
            break;
        }
      } catch (error) {
        // 실패
      }
    };
    sendAuthCode();
  }, []);
  return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirect;
