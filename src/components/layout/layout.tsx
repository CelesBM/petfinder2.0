import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Header } from "../header/header";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export { Layout };
