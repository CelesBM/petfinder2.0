import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { ButtonPrincipal } from "../../ui/button/button";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <section className="login">
        <h1>Iniciar Sesión</h1>
        <p>Ingresá tus datos para continuar.</p>
        <div className="login-container">
          <form>
            <label>Email:</label>
            <input
              type="email"
              id="email"
              className="email"
              name="email"
              required
            />
            <label>Contraseña:</label>
            <input
              type="password"
              id="password"
              className="password"
              name="password"
              required
            />
            <ButtonPrincipal
              type="submit"
              className="login-button"
              handleClick={() => {
                navigate("/");
              }}
            >
              Iniciar sesión
            </ButtonPrincipal>
          </form>
          <p className="text-register">
            Aún no tenes cuenta? <a href="/register">Registrate</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export { Login };
