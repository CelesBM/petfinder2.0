import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { ButtonPrincipal } from "../../ui/button/button";

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <section className="register">
        <h1>Crea una cuenta</h1>
        <p>Ingresá tus datos para continuar.</p>
        <div className="register-container">
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
              className="register-button"
              handleClick={() => {
                navigate("/");
              }}
            >
              Registrarse
            </ButtonPrincipal>
          </form>
          <p className="text-register">
            Ya tienes cuenta? <a href="/login">Inicia sesión.</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export { Register };
