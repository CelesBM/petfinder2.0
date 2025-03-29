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
import { Register } from "../pages/register/register";
import { Data } from "../pages/personal-data/data";
import { EditData } from "../pages/personal-data/edit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/personal-data" element={<Data />} />
      <Route path="/edit-personal-data" element={<EditData />} />
    </Route>
  )
);

export { router };
