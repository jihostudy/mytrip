import React, { useEffect, useRef, useState } from "react";

// custom hook
import { useConfirmModal } from "../hook/useConfirmModal";
import { useNavigate } from "react-router-dom";

// API
import { API } from "../api/API";

// recoil
import { user } from "../lib/constants/userInfo";
import { useRecoilState } from "recoil";

// message
const VALID_USERNAME_MESSAGE = "사용가능한 닉네임입니다";
const INVALID_USERNAME_MESSAGE = "닉네임 중복검사를 다시해주세요";
const DELETE_MESSAGE =
  "현재 사용중인 계정 정보는 복구 불가능합니다.\n커뮤니티에 등록한 게시물은 삭제되지 않고 유지됩니다. 삭제를 원하는 게시물이 있을 경우, 반드시 삭제 후 탈퇴 하시기 바라며, 필요한 데이터는 미리 백업을 해주시기 바랍니다.";

const UserInfoPage = () => {
  const [userEmail, setUserEmail] = useState();
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [isNameChange, setIsNameChange] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(0); // 0 : 초기, 1 : 중복, 2 : 사용가능
  const [isSNS, setIsSNS] = useState(true);

  // modal hook
  const { openModal } = useConfirmModal();

  // navigate
  const navigate = useNavigate();

  // ref
  const usernameRef = useRef();

  // ----------------- username handler -----------------
  async function nameCheckHandler() {
    // 중복 체크
    console.log("중복 체크");
    try {
      const res = await API.post("/auth/verify/username", {
        username: usernameRef.current.value,
      });
      const status = res.status;
      if (status === 200) {
        // 사용 가능한 닉네임
        setIsUserNameValid(2);
      }
      console.log(status);
    } catch (e) {
      //
      const status = e.response.status;
      console.log(status);
      if (status === 409) {
        // 중복된 닉네임
        setIsUserNameValid(1);
      } else {
        // 서버 오류
        console.log("server error");
      }
    }
  }
  async function nameChangeHandler() {
    // 닉네임 변경
    console.log("닉네임 변경");
    try {
      const res = await API.post("/auth/updateUsername", {
        username: usernameRef.current.value,
      });
      const status = res.status;
      if (isUserNameValid !== 2) {
        setIsUserNameValid(1);
        console.log("invlaid username");
        return;
      }

      if (status === 200 && isUserNameValid === 2) {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", res.headers.get("Authorization"));
        setUserInfo(() => ({
          isLogin: true,
          username: usernameRef.current.value,
        }));
        console.log("change username");
        setIsUserNameValid(0);
        setIsNameChange(false);
        // 닉네임 변경 완료
      }
    } catch (e) {
      const status = e.response.status;
      // 500 서버 오류
      console.log(status, "server error");
    }
  }
  // username message;
  let usernameMessage = "";
  if (isUserNameValid === 0) {
    usernameMessage = <p>&nbsp;</p>;
  }
  if (isUserNameValid === 1) {
    usernameMessage = (
      <p className="text-xs text-[#EB4315]">{INVALID_USERNAME_MESSAGE}</p>
    );
  }
  if (isUserNameValid === 2) {
    usernameMessage = (
      <p className="text-xs text-[#38C3FF]">{VALID_USERNAME_MESSAGE}</p>
    );
  }

  // ----------------- password handler -----------------
  function passwordHandler() {
    if (isSNS) {
      alert("SNS 계정 이용자입니다.");
      return;
    }

    navigate("/home/auth/changePassword");
  }

  // ----------------- delete account handler -----------------
  function deleteClick() {
    // modal
    openModal({
      content: DELETE_MESSAGE,
      callback: () => {
        deleteHandler();
      },
    });
  }

  async function deleteHandler() {
    // API
    try {
      const res = await API.delete("/auth/signout");
      const status = res.status;
      if (status === 200) {
        console.log("회원 탈퇴");
      }
    } catch (error) {
      const status = error.response.status;
      if (status === 500) {
        console.log(status, "server error");
      } else if (status === 404) {
        console.log((status, "User not found"));
      }
    }

    // recoil 수정
    setUserInfo(() => ({
      isLogin: false,
      username: null,
    }));

    // 토큰 삭제
    localStorage.removeItem("accessToken");
    // 리다이렉트
    navigate("/start");
  }

  // 이메일, sns 저장
  useEffect(() => {
    async function getEmail() {
      try {
        const res = await API.get("/my-page/profile");
        console.log(res.data);
        setUserEmail(res.data.email);
        if (res.data.snsLogin) {
          setIsSNS(true);
        } else {
          setIsSNS(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getEmail();
  }, []);
  return (
    <div className="flex h-[60%] flex-col items-center justify-center gap-1">
      {/* 닉네임 변경 */}
      <div className="flex h-[7%] w-[50%] justify-between gap-2">
        <p className="flex w-[20%] items-center">닉네임</p>
        {!isNameChange ? (
          <p className="flex grow items-center">{userInfo.username}</p>
        ) : (
          <>
            <input
              className="grow"
              placeholder="입력해주세요"
              ref={usernameRef}
            />
          </>
        )}
        {!isNameChange ? (
          <div className="flex w-[25%]">
            <button
              onClick={() => setIsNameChange((prev) => !prev)}
              className="rounded-md border-1 border-solid border-black px-2 text-sm hover:bg-slate-100"
            >
              수정
            </button>
          </div>
        ) : (
          <div className="relative flex w-[25%] gap-5">
            <button
              onClick={nameCheckHandler}
              className="rounded-md border-1 border-solid border-black px-2 text-sm hover:bg-slate-100"
            >
              중복확인
            </button>
            <button
              onClick={nameChangeHandler}
              className="absolute left-2/3 aspect-square w-[60%] rounded-[50%] border-[1px] border-solid border-black bg-[#FFCB16] shadow-[0_0_40px_0px_#FFCB16]"
            >
              변경
            </button>
          </div>
        )}
      </div>
      {/* 닉네임 확인 문구 */}
      <div className="mb-1 w-[50%]">{usernameMessage}</div>
      {/* 이메일 표시 */}
      <div className="flex h-[7%] w-[50%] justify-start gap-2">
        <p className="flex w-[20%] items-center">이메일</p>
        <p className="flex items-center text-[#00000066]">{userEmail}</p>
      </div>
      {/* 비밀번호 변경, 회원 탈퇴  */}
      <div className="mt-10 flex w-[50%] gap-4">
        <div
          onClick={passwordHandler}
          className="text-sm text-[#00000066] underline hover:cursor-pointer"
        >
          비밀번호
        </div>
        <div
          onClick={deleteClick}
          className="text-sm text-[#00000066] underline hover:cursor-pointer"
        >
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
