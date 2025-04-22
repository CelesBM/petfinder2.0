import React from "react";
import "./error.css";

type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return <p className="error-message">{message}</p>;
}

//<ErrorMessage message="Contraseña incorrecta" />
