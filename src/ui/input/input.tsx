import React, { Children } from "react";
import "./input.css";

interface InputPrincipalProps {
  type: string;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputPrincipal({
  type,
  placeholder,
  id,
  name,
  className = "",
  value,
  onChange,
}: InputPrincipalProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      className={`input ${className}`.trim()}
      required
      value={value}
      onChange={onChange}
    />
  );
}
