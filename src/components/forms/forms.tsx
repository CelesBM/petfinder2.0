import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";
import { ErrorMessage } from "../../ui/error/error";

function Login({ handleLogin }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target as any;
    const email = target.email.value;
    const password = target.password.value;

    if (!email || !password) {
      setError("Los campos requeridos son obligatorios.");
      return;
    }

    setError("");
    const loginError = await handleLogin(email, password);

    if (loginError) {
      setError(loginError);
      return;
    } else {
      navigate("/personal-data");
    }
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
            {error && <ErrorMessage message={error} />}
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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const target = e.target as any;
    const email = target.email.value;
    const password = target.password.value;
    const confirm = target.confirm.value;

    if (!email || !password || !confirm) {
      setError("Los campos requeridos son obligatorios.");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas deben coincidir.");
      return;
    }

    setError(""); //limpio si está todo ok

    handleRegister(email, password, confirm);
    navigate("/login");
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
            {error && <ErrorMessage message={error} />}
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
