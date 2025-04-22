import React from "react";
import { Login } from "../../components/forms/forms";
import { useLogin } from "../../hooks/hooks";

function LoginPage() {
  const { handleLogin } = useLogin();
  return <Login handleLogin={handleLogin} />;
}

export { LoginPage };
