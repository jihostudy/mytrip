// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// cookies
import { CookiesProvider } from "react-cookie";
// recoil
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
