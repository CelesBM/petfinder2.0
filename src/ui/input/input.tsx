import React, { Children } from "react";
import "./input.css";

export function InputPrincipal({
  type,
  placeholder,
  id,
  name,
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      className={`input ${className}`.trim()}
    />
  );
}
