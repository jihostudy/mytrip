import React from "react";
// router
import { Outlet } from "react-router-dom";
const RegisterLayout = () => {
  return (
    <>
      <Outlet />
      <div className="absolute bottom-0 h-1/5 w-full rounded-[50%] bg-gradient-radial from-[#CD8B3E] via-[#E8B57900] via-70% to-[#E8B57900]" />
    </>
  );
};

export default RegisterLayout;
