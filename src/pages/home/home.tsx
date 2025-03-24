import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import "./home.css";
import { ButtonPrincipal } from "../../ui/button/button";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="home">
        <h1>Pet finder</h1>
        <img
          src="https://www.behealthpr.com/wp-content/uploads/2024/01/Foto-Todo-lo-que-debes-saber-antes-de-adoptar-una-mascota-2.jpg"
          alt="img-pet"
        />
        <div>
          <ButtonPrincipal
            type="button"
            handleClick={() => {
              navigate("/instructions");
            }}
          >
            Qué es pet finder?
          </ButtonPrincipal>
          <ButtonPrincipal
            type="button"
            handleClick={() => {
              navigate("/login");
            }}
          >
            Iniciar sesión
          </ButtonPrincipal>
        </div>
      </section>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

export { Home };
