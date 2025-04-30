import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";
import { ErrorMessage } from "../../ui/error/error";
import "./reports.css";

function ReportPet({ handleLogin }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target as any;
    const petName = target.petName.value;
    const petImg = target.petImg.value;
    const petLocation = target.petLocation.value;

    if (!petName || !petImg || petLocation) {
      setError("Los campos requeridos son obligatorios.");
      return;
    }

    setError("");
    /* const loginError = await handleLogin(email, password);

    if (loginError) {
      setError(loginError);
      return;
    } else {
      navigate("/personal-data");
    }*/
  };

  return (
    <>
      <section className="create-report-container">
        <h1>Reportar mascota</h1>
        <p>Ingresá los datos de tu mascota.</p>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <label>Nombre:</label>
            <InputPrincipal
              type="text"
              placeholder="Ingrese el nombre de la mascota"
              id="name"
              name="name"
            />
            <div className="img-container">
              <label>Adjuntar foto 👇</label>
              <img
                src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1715798301/pet-finder/reports/gdiqwa4ttphpeuaarxzw.png"
                alt="pet"
              />
            </div>
            <div className="map-container">
              <label>Ubicación:</label>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"
                alt="map"
              />
              <InputPrincipal
                type="text"
                placeholder="Ingrese la ubicación"
                id="location"
                name="location"
              />
              <ButtonPrincipal
                type="submit"
                className="search-button"
                handleClick={() => {}}
              >
                Buscar
              </ButtonPrincipal>
              <p className="info">
                Hacé click en el mapa para seleccionar la ubicación donde viste
                la mascota por última vez o escribí la dirección.
              </p>
            </div>

            <div className="options-container">
              <ButtonPrincipal
                type="submit"
                className="report-button"
                handleClick={() => {}}
              >
                Reportar mascota
              </ButtonPrincipal>
              <ButtonPrincipal
                type="submit"
                className="cancel-button"
                handleClick={() => {}}
              >
                Cancelar
              </ButtonPrincipal>
            </div>
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      </section>
    </>
  );
}

function MyReports({}) {
  return (
    <>
      <section className="myreports-container">
        <h1>Mis reportes</h1>
        <div className="container">
          <div className="pet-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"
              alt=""
            />
            <div className="info-pet">
              <h3>Firulais</h3>
              <h5>Larrea 407, Quilmes.</h5>
            </div>
            <div className="button-container">
              <ButtonPrincipal
                type="submit"
                className="edit-button"
                handleClick={() => {}}
              >
                Editar
              </ButtonPrincipal>
              <ButtonPrincipal
                type="submit"
                className="delete-button"
                handleClick={() => {}}
              >
                Eliminar
              </ButtonPrincipal>
            </div>
          </div>
          <div className="pet-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"
              alt=""
            />
            <div className="info-pet">
              <h3>Firulais</h3>
              <h5>Larrea 407, Quilmes.</h5>
            </div>
            <div className="button-container">
              <ButtonPrincipal
                type="submit"
                className="edit-button"
                handleClick={() => {}}
              >
                Editar
              </ButtonPrincipal>
              <ButtonPrincipal
                type="submit"
                className="delete-button"
                handleClick={() => {}}
              >
                Eliminar
              </ButtonPrincipal>
            </div>
          </div>
          <div className="pet-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"
              alt=""
            />
            <div className="info-pet">
              <h3>Firulais</h3>
              <h5>Larrea 407, Quilmes.</h5>
            </div>
            <div className="button-container">
              <ButtonPrincipal
                type="submit"
                className="edit-button"
                handleClick={() => {}}
              >
                Editar
              </ButtonPrincipal>
              <ButtonPrincipal
                type="submit"
                className="delete-button"
                handleClick={() => {}}
              >
                Eliminar
              </ButtonPrincipal>
            </div>
          </div>
          <div className="pet-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"
              alt=""
            />
            <div className="info-pet">
              <h3>Firulais</h3>
              <h5>Larrea 407, Quilmes.</h5>
            </div>
            <div className="button-container">
              <ButtonPrincipal
                type="submit"
                className="edit-button"
                handleClick={() => {}}
              >
                Editar
              </ButtonPrincipal>
              <ButtonPrincipal
                type="submit"
                className="delete-button"
                handleClick={() => {}}
              >
                Eliminar
              </ButtonPrincipal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { ReportPet, MyReports };
