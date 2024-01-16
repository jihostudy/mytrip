import React from "react";

import { useRef } from "react";

const NewUserNamePage = () => {
  const username = useRef();

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form className="flex flex-col gap-4">
        <input type="text" className="bg-orange-300" placeholder="username" />
        <button type="submit" className="border-2 border-red-800">
          제출
        </button>
      </form>
    </div>
  );
};

export default NewUserNamePage;
