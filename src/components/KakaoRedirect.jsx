import React, { useEffect } from "react";
// axios
import { API } from "../lib/API";
const KakaoRedirect = () => {
  useEffect(() => {
    // 인가코드 추출
    let authCode = new URL(window.location.href).searchParams.get("code");
    const sendAuthCode = async () => {
      try {
        const res = await API.get({
          params: {
            code: authCode,
          },
        });
      } catch (error) {
        // 성공
        // 실패
      }
    };
    sendAuthCode();
  }, []);
  return <div>카카오 리다이렉트 페이지</div>;
};

export default KakaoRedirect;
