import React from "react";
import { useNavigate } from "react-router-dom";
import "./data.css";
import { ButtonPrincipal } from "../../ui/button/button";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../../recoil";

function Data() {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataAtom);

  const name = userData?.fullname || "Sin datos";
  const location = userData?.localidad || "Sin datos";

  return (
    <>
      <section className="data">
        <h1>Mis datos</h1>
        <p>Recuerde mantener sus datos actualizados.</p>
        <div className="data-container">
          <div className="info">
            <h5>
              Nombre: <span>{name}</span>
            </h5>
            <h5>
              Localidad: <span>{location}</span>
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
