import React from "react";

//axios
import { API } from "../api/API";

// params로 중복 체크 했는지 검사하는 state함수가 필요할듯??
const ConfrimBtn = ({ classes, item, value, setIsCheck }) => {
  let postUrl;
  const clickHandler = () => {
    const postUrl = "/auth/verify" + item;

    async function confirm() {
      try {
        const res = await API.post(postUrl, value);
        console.log(res);
        console.log(res.status);

        if (res.status === 200) {
          alert("사용 가능합니다.");
          setIsCheck(True);
        }
      } catch (error) {
        console.log(error.status);
        console.log(error);
      }
    }

    confirm();
  };

  return (
    <button onClick={clickHandler} className={classes}>
      중복 검사
    </button>
  );
};

export default ConfrimBtn;
