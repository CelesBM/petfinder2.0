import React from "react";
import { useNavigate } from "react-router-dom";
import "./instructions.css";
import { ButtonPrincipal } from "../../ui/button/button";

function Instructions() {
  const navigate = useNavigate();

  return (
    <>
      <section className="instructions">
        <h1>Bienvenido a Pet Finder </h1>
        <p className="text-one">
          <span>Pet Finder</span> es una iniciativa pensada para ayudar a reunir
          a nuestras queridas mascotas con sus familias. Sabemos lo importante
          que son nuestros amigos de cuatro patas, y por eso queremos facilitar
          la búsqueda de aquellos que se han extraviado.
        </p>
        <ul>
          Con Pet Finder puedes:
          <li>
            🦴 Compartir tu ubicación para conocer las mascotas perdidas cerca
            de ti.
          </li>
          <li>
            🦴 Reportar una mascota perdida en tu zona para que más personas
            puedan ayudar a encontrarla.
          </li>
        </ul>
        <p className="text-two">
          Juntos, podemos hacer la diferencia y darles a nuestras mascotas la
          oportunidad de volver a casa. 💜
        </p>
        <ButtonPrincipal
          type="button"
          handleClick={() => {
            navigate("/");
          }}
        >
          Volver
        </ButtonPrincipal>
      </section>
    </>
  );
}

export { Instructions };
