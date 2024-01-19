import React from "react";
// router
import { Outlet } from "react-router-dom";
const RegisterLayout = () => {
  return (
    <>
      <Outlet />
      <div className="bg-gradient-radial absolute bottom-0 h-1/5 w-full rounded-[50%] from-[#CD8B3E] to-[#E8B57900]" />
    </>
  );
};

export default RegisterLayout;
