import React from "react";
import { Login } from "../../components/forms/forms";

function LoginPage() {
  const handleLogin = (email: string, password: string) => {
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return <Login handleLogin={handleLogin} />;
}

export { LoginPage };

/*import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";

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
*/
