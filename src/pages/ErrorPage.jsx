import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/common/Header";

const ErrorPage = () => {
  const error = useRouteError();

  console.log(error);
  let message = "Routing Error Occured!";

  return (
    <>
      <Header />
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;
