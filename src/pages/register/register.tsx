import React from "react";
import { Register } from "../../components/forms/forms";
import { useLogin } from "../../hooks/hooks";

function RegisterPage() {
  const { handleLogin } = useLogin();
  return <Register handleRegister={handleLogin} />;
}

export { RegisterPage };
