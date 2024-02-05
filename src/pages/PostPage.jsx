import React from "react";
// router
import { useLocation } from "react-router-dom";
const PostPage = () => {
  const location = useLocation();
  console.log(location.state);
  const postData = location.state;
  return <div></div>;
};

export default PostPage;
