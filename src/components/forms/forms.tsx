import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";

function Login({ handleLogin }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target as any;
    handleLogin(target.email.value, target.password.value);
  };
  return (
    <>
      <section className="log-container">
        <h1>Iniciar Sesión</h1>
        <p>Ingresá tus datos para continuar.</p>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <label>Email:</label>
            <InputPrincipal
              type="email"
              placeholder="Ingrese su email"
              id="email"
              name="email"
            />
            <label>Contraseña:</label>
            <InputPrincipal
              type="password"
              placeholder="Ingrese su contraseña"
              id="password"
              name="password"
            />
            <ButtonPrincipal
              type="submit"
              className="log-button"
              handleClick={() => {}}
            >
              Iniciar sesión
            </ButtonPrincipal>
          </form>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <p className="text-register">
              Aún no tenes cuenta? <span>Registrate</span>.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

function Register({ handleRegister }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target as any;
    handleRegister(
      target.email.value,
      target.password.value,
      target.confirm.value
    );
  };
  return (
    <>
      <section className="log-container">
        <h1>Crea una cuenta</h1>
        <p>Ingresá tus datos para continuar.</p>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <label>Email:</label>
            <InputPrincipal
              type="email"
              placeholder="Ingrese su email"
              id="email"
              name="email"
            />
            <label>Contraseña:</label>
            <InputPrincipal
              type="password"
              placeholder="Ingrese una contraseña"
              id="password"
              name="password"
            />
            <label>Confirme contraseña:</label>
            <InputPrincipal
              type="password"
              placeholder="Confirme la contraseña"
              id="confirm"
              name="confirm"
            />
            <ButtonPrincipal
              type="submit"
              className="log-button "
              handleClick={() => {}}
            >
              Registrarse
            </ButtonPrincipal>
          </form>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <p className="text-register">
              Ya tienes cuenta? <span>Inicia sesión.</span>.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

export { Login, Register };
