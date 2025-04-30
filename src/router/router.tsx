import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { Home } from "../pages/home/home";
import { Instructions } from "../pages/instructions/instructions";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { Data } from "../pages/personal-data/data";
import { EditData } from "../pages/personal-data/edit";
import { CreateReportPage } from "../pages/report/create-report";
import { MyReportsPage } from "../pages/report/my-reports";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/personal-data" element={<Data />} />
      <Route path="/edit-personal-data" element={<EditData />} />
      <Route path="/create-report" element={<CreateReportPage />} />
      <Route path="/my-reports" element={<MyReportsPage />} />
    </Route>
  )
);

export { router };
