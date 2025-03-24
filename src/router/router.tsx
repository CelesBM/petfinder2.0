import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { Home } from "../pages/home/home";
import { Instructions } from "../pages/instructions/instructions";
import { Login } from "../pages/login/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export { router };
