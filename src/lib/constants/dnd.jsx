import React from "react";
// recoil
import { atom } from "recoil";

export const dndHoverState = atom({
  key: "dndHoverState",
  default: {
    hour: null,
    minute: null,
  },
});
