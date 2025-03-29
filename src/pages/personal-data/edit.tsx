import React from "react";
import { useNavigate } from "react-router-dom";
import "./edit.css";
import { ButtonPrincipal } from "../../ui/button/button";

function EditData() {
  const navigate = useNavigate();
  return (
    <>
      <section className="data">
        <h1>Mis datos</h1>
        <p>Actualice los datos por favor.</p>
        <div className="data-container">
          <form>
            <label>Nombre:</label>
            <input
              type="text"
              id="name"
              className="name"
              name="name"
              placeholder="Ingrese su nombre"
            />
            <label>Localidad:</label>
            <input
              type="text"
              id="localidad"
              className="localidad"
              name="localidad"
              placeholder="Ingrese ´Localidad, Provincia´"
            />
          </form>
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
      </section>
    </>
  );
}

export { EditData };
