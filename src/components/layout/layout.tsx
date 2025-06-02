import React from "react";
import "../../../index.css";
import { useNavigate, Outlet } from "react-router-dom";
import { Header } from "../header/header";

function Layout() {
  return (
    <div className="main-layout">
      <Header />
      <Outlet />
    </div>
  );
}

export { Layout };
