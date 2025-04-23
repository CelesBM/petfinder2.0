import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./edit.css";
import { ButtonPrincipal } from "../../ui/button/button";
import { useRecoilValue } from "recoil";
import { loggedInAtom, userLocationAtom, userDataAtom } from "../../recoil";
import { useUpdateUserData } from "../../hooks/hooks";
import { getCoords } from "../../lib/api";

function EditData() {
  const navigate = useNavigate();
  const token = useRecoilValue(loggedInAtom);
  const locationData = useRecoilValue(userLocationAtom);
  const { handleUpdateUserData } = useUpdateUserData();
  const userData = useRecoilValue(userDataAtom);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!token) {
      console.error("No hay token");
      return;
    }

    // Obtener coordenadas desde el nombre de la localidad
    const coords = await getCoords(location);
    if (!coords) {
      console.error("No se pudieron obtener coordenadas");
      return;
    }

    await handleUpdateUserData(name, location, coords.lat, coords.lng, token);
    navigate("/personal-data");
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Localidad:</label>
            <input
              type="text"
              id="localidad"
              className="localidad"
              name="localidad"
              placeholder="Ingrese ´Localidad, Provincia´"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </form>
        </div>

        <ButtonPrincipal
          type="button"
          className="data-button"
          handleClick={handleSubmit}
        >
          Guardar cambios
        </ButtonPrincipal>
      </section>
    </>
  );
}

export { EditData };
