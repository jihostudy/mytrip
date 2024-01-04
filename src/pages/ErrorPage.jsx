import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Routing Error Occured!";
  if (error.status === 500) {
    message = error.data.message;
  }
  return (
    <>
      <Header />
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;
