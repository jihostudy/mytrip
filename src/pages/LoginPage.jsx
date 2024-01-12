import React, { useRef } from "react";
// axios
import { API } from "../lib/API";

const LoginPage = () => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const LoginHandler = async (event) => {
    event.preventDefault();
    const userInput = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await API.post("/auth/login", {
        data: userInput,
      });

      const result = response.data;
      console.log(result);
    } catch (error) {
      // status에 따른 Error Handling
      const statusCode = error.response.status; // 400
      const statusText = error.response.statusText; // Bad Request
      console.log(`${statusCode} - ${statusText} - ${message}`);
    }
  };
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <form className="flex flex-col" onSubmit={(e) => LoginHandler(e)}>
        <label>ID</label>
        <input
          type="text"
          ref={idRef}
          className=" border-2 border-black bg-orange-300"
        />
        <label>Password</label>
        <input type="password" id={passwordRef} className="bg-orange-300" />
        <br />
        <button type="submit" className="border-2 border-red-800">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
