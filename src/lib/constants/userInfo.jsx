import React from "react";
// recoil
import { atom } from "recoil";

export const user = atom({
  key: "userInfo",
  default: {
    isLogin: false,
    username: null,
    // email: null,
  },
});
