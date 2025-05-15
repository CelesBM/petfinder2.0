import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";
import { ErrorMessage } from "../../ui/error/error";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userLocationAtom,
  loggedInAtom,
  userDataAtom,
  reportPet,
} from "../../recoil";
import { MapSelector } from "../map/map";
import { getCoords, reportPetAPI } from "../../lib/api";
import "./reports.css";

function ReportPet({}) {
  const userData = useRecoilValue(userDataAtom); //datos del usuario: email, fullname, id, localidad, userLat, userLong
  //const token = useRecoilValue(loggedInAtom); //token del usuario
  const fileInputRef = useRef<HTMLInputElement>(null); //referencia a un elemento input de tipo file inicializado como null
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [imgURL, setImgURL] = useState(
    "https://res.cloudinary.com/dkzmrfgus/image/upload/v1715798301/pet-finder/reports/gdiqwa4ttphpeuaarxzw.png"
  );
  const [userLocation, setUserLocation] = useRecoilState(userLocationAtom);
  const [petReport, setPetReport] = useRecoilState(reportPet); //guardar reporte en recoil

  const handleImage = (e) => {
    const file = e.target.files?.[0]; //primer archivo seleccionado
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgURL(reader.result as string); //almacena URL de imagen
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target as any;
    const petName = target.petName.value;
    const petImgURL = target.petImg.files[0];
    const petLocation = target.petLocation.value;

    if (!petName || !petImgURL || !petLocation) {
      setError("Los campos requeridos son obligatorios.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", petImgURL);
      formData.append("upload_preset", "pet-finder");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/ddaw8l94t/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadRes.json();
      const cloudinaryUrl = uploadData.secure_url;
      console.log("Imagen subida:", cloudinaryUrl);

      const userId = userData.id;
      const petLat = userLocation.lat;
      const petLong = userLocation.lng;
      const petState = "lost";
      const res = await reportPetAPI(
        userId,
        petName,
        cloudinaryUrl,
        petState,
        petLat,
        petLong,
        petLocation
      );

      if (res && res.id) {
        setPetReport(res);
        navigate("/my-reports");
      } else {
        setError("Error al guardar el reporte.");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setError("Error al subir imagen.");
    }
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
              id="petName"
              name="petName"
            />
            <div className="img-container">
              <label>Adjuntar foto 👇</label>
              <input
                type="file"
                name="petImg"
                id="petImg"
                accept="image/*"
                onChange={handleImage}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <img
                src={imgURL}
                alt="preview"
                className="preview-img"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "12px",
                }}
              />
            </div>
            <div className="map-container">
              <label>Ubicación:</label>
              <MapSelector
                onSelect={(lat, lng, location) => {
                  setUserLocation({ lat, lng, location: location || "" });
                  const input = document.getElementById(
                    "petLocation"
                  ) as HTMLInputElement;
                  if (input && location) {
                    input.value = location;
                  }
                }}
              />
              <InputPrincipal
                type="text"
                placeholder="Ingrese la ubicación"
                id="petLocation"
                name="petLocation"
              />
              <ButtonPrincipal
                type="button"
                className="search-button"
                handleClick={async () => {
                  const input = document.getElementById(
                    "petLocation"
                  ) as HTMLInputElement;
                  const location = input?.value;
                  if (location) {
                    const coords = await getCoords(location);
                    if (coords) {
                      setUserLocation({
                        lat: coords.lat,
                        lng: coords.lng,
                        location,
                      });
                    } else {
                      setError("No se encontró la ubicación");
                    }
                  }
                }}
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
                handleClick={() => {
                  navigate("/my-reports");
                }}
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
