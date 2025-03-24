import React, { Suspense } from "react";
import { router } from "./router/router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("app")).render(
  <Suspense fallback={"cargando"}>
    <RouterProvider router={router} />
  </Suspense>
);
