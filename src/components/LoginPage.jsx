import React, { useRef } from "react";

const LoginPage = () => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const LoginHandler = async (event) => {
    event.preventDefault();
    // console.log(idRef.current.value);
    const userInput = {
      id: idRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput), // JS 객체를 JSON 문자열로 변환
      });
      // res받고
      if (response.ok) {
        const result = await response.json();

        localStorage.setItem("token", result.token);
        console.log("Login Success!");
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => LoginHandler(e)}
      >
        <label>ID</label>
        <input type="text" ref={idRef} />
        <label>Password</label>
        <input type="password" id={passwordRef} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
