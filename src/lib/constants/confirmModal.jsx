import React from "react";
// recoil
import { atom } from "recoil";

export const confirmModalState = atom({
  key: "confirmModalState",
  default: {
    isOpen: false,
    content: "",
    callBack: () => {},
  },
});
