import axios from "axios";
// cookies
import { Cookies } from "react-cookie";
export const API = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    // access_token 자리
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

//refresh token 재발급 api
export async function postRefreshToken() {
  const cookie = new Cookies();
  const response = await publicApi.post("refresh token 재발급 경로", {
    refreshToken: cookie.get("refreshToken"),
  });
  return response;
}

//토큰을 함께보내는 API에 interceptor를 적용합니다
API.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    //토큰이 만료되을 때
    if (status === 401) {
      if (error.response.data.message === "Unauthorized") {
        const originRequest = config;
        //리프레시 토큰 api
        const response = await postRefreshToken();
        //리프레시 토큰 요청이 성공할 때
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          //진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        }
        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
        else if (response.status === 404) {
          alert(LOGIN.MESSAGE.EXPIRED);
          window.location.replace("/sign-in");
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    }
    return Promise.reject(error);
  },
);
