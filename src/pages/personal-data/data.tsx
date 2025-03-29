import React from "react";
import { useNavigate } from "react-router-dom";
import "./data.css";
import { ButtonPrincipal } from "../../ui/button/button";

function Data() {
  const navigate = useNavigate();
  return (
    <>
      <section className="data">
        <h1>Mis datos</h1>
        <p>Recuerde mantener sus datos actualizados.</p>
        <div className="data-container">
          <div className="info">
            <h5>
              Nombre: <span>Celeste</span>
            </h5>
            <h5>
              Localidad: <span>Quilmes</span>{" "}
            </h5>
          </div>

          <ButtonPrincipal
            type="button"
            className="data-button"
            handleClick={() => {
              navigate("/edit-personal-data");
            }}
          >
            Modificar datos
          </ButtonPrincipal>
        </div>
      </section>
    </>
  );
}

export { Data };
