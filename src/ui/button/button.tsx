import React, { Children } from "react";
import "./button.css";

export function ButtonPrincipal({
  children,
  type,
  handleClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${className}`.trim()}
    >
      {children}
    </button>
  );
}
