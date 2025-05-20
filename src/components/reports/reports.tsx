import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrincipal } from "../../ui/button/button";
import { InputPrincipal } from "../../ui/input/input";
import { ErrorMessage } from "../../ui/error/error";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userLocationAtom,
  userDataAtom,
  reportPet,
  loggedInState,
  reportIdAtom,
  userReportsAtom,
} from "../../recoil";
import {
  useUserReports,
  useDeletePet,
  useEditPet,
  useNearbyPets,
} from "../../hooks/hooks";
import { MapSelector } from "../map/map";
import { getCoords, reportPetAPI } from "../../lib/api";
import "./reports.css";

function ReportPet({}) {
  const userData = useRecoilValue(userDataAtom); //datos del usuario: email, fullname, id, localidad, userLat, userLong
  const fileInputRef = useRef<HTMLInputElement>(null); //referencia a un elemento input de tipo file inicializado como null
  const navigate = useNavigate();
  const [userReports, setUserReports] = useRecoilState(userReportsAtom);
  const [error, setError] = useState("");
  const [imgURL, setImgURL] = useState(
    "https://res.cloudinary.com/dkzmrfgus/image/upload/v1715798301/pet-finder/reports/gdiqwa4ttphpeuaarxzw.png"
  );
  const [userLocation, setUserLocation] = useRecoilState(userLocationAtom);

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
        setUserReports((prev) => [...(prev || []), res]); //agrega el nuevo al array
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

function MyReports() {
  const navigate = useNavigate();
  const token = useRecoilValue(loggedInState);
  const userData = useRecoilValue(userDataAtom);
  const userReports = useRecoilValue(userReportsAtom);
  const [reportId, setReportId] = useRecoilState(reportIdAtom);
  const { handleUpdateUserReports } = useUserReports();
  const { deletePet } = useDeletePet();
  //console.log("userdata", userData);
  //console.log("userReports", userReports);

  useEffect(() => {
    if (token) {
      handleUpdateUserReports(token);
    }
  }, [token]);

  return (
    <section className="myreports-container">
      <h1>Mis reportes</h1>
      {Array.isArray(userReports) && userReports.length > 0 ? (
        <div className="container">
          {userReports.map((report) => (
            <div className="pet-container" key={report.id}>
              <img src={report.petImgURL} alt={`Mascota: ${report.petName}`} />
              <div className="info-pet">
                <h3>{report.petName}</h3>
                <h5>{report.petLocation}</h5>
              </div>
              <div className="button-container">
                <ButtonPrincipal
                  type="button"
                  className="edit-button"
                  handleClick={() => {
                    setReportId(report.id);
                    navigate(`/edit-report`);
                  }}
                >
                  Editar
                </ButtonPrincipal>
                <ButtonPrincipal
                  type="button"
                  className="delete-button"
                  handleClick={() => {
                    deletePet(report.id);
                  }}
                >
                  Eliminar
                </ButtonPrincipal>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reportaste ninguna mascota aún.</p>
      )}
    </section>
  );
}

function EditReportPet({}) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = useRecoilValue(userDataAtom);
  const [userLocation, setUserLocation] = useRecoilState(userLocationAtom);
  const [userReports, setUserReports] = useRecoilState(userReportsAtom);
  const reportId = useRecoilValue(reportIdAtom);
  const [error, setError] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [petName, setPetName] = useState("");
  const [petLocation, setPetLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { editPet } = useEditPet();
  const petToEdit = userReports?.find((r) => r.id === reportId);

  useEffect(() => {
    if (petToEdit) {
      setPetName(petToEdit.petName);
      setImgURL(petToEdit.petImgURL);
      setPetLocation(petToEdit.petLocation);
      setUserLocation({
        lat: petToEdit.petLat,
        lng: petToEdit.petLong,
        location: petToEdit.petLocation,
      });
    }
  }, [petToEdit]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImgURL(reader.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!petName || !petLocation || !userLocation.lat || !userLocation.lng) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      let newImageUrl = imgURL;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "pet-finder");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ddaw8l94t/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        newImageUrl = data.secure_url;
      }

      if (!petToEdit) {
        setError("No se encontró la mascota a editar.");
        return;
      }
      await editPet({
        id: petToEdit.id,
        userId: userData.id,
        petName,
        petImgURL: newImageUrl,
        petState: "Perdido",
        petLat: userLocation.lat,
        petLong: userLocation.lng,
        petLocation,
      });
      navigate("/my-reports");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("Error al actualizar el reporte.");
    }
  };

  return (
    <section className="create-report-container">
      <h1>Editar reporte</h1>
      <p>Modificá los datos de tu mascota.</p>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>Nombre:</label>
          <InputPrincipal
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Ingrese el nombre de la mascota"
          />

          <div className="img-container">
            <label>Adjuntar foto 👇</label>
            <input
              type="file"
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
                setUserLocation({ lat, lng, location });
                setPetLocation(location || "");
              }}
            />
            <InputPrincipal
              type="text"
              value={petLocation}
              onChange={(e) => setPetLocation(e.target.value)}
              placeholder="Ingrese la ubicación"
            />
            <ButtonPrincipal
              type="button"
              className="search-button"
              handleClick={async () => {
                const coords = await getCoords(petLocation);
                if (coords) {
                  setUserLocation({
                    lat: coords.lat,
                    lng: coords.lng,
                    location: petLocation,
                  });
                } else {
                  setError("No se encontró la ubicación.");
                }
              }}
            >
              Buscar
            </ButtonPrincipal>
            <p className="info">
              Hacé click en el mapa para seleccionar la ubicación o escribí la
              dirección.
            </p>
          </div>

          <div className="options-container">
            <ButtonPrincipal
              type="submit"
              className="report-button"
              handleClick={() => {}}
            >
              Guardar cambios
            </ButtonPrincipal>
            <ButtonPrincipal
              type="button"
              className="cancel-button"
              handleClick={() => navigate("/my-reports")}
            >
              Cancelar
            </ButtonPrincipal>
          </div>
          {error && <ErrorMessage message={error} />}
        </form>
      </div>
    </section>
  );
}

function NearbyPets() {
  const userCoords = useRecoilValue(userLocationAtom);
  const { pets, loading, error } = useNearbyPets(
    userCoords?.lat || 0,
    userCoords?.lng || 0
  );

  if (!userCoords) return <p>Esperando ubicación del usuario...</p>;
  if (loading) return <p>Cargando mascotas cercanas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="myreports-container">
      <h1>Mascotas cercanas</h1>
      {pets.length === 0 ? (
        <p>No hay mascotas reportadas cerca.</p>
      ) : (
        <div className="container">
          {pets.map((pet) => (
            <div className="pet-container" key={pet.objectID}>
              <img src={pet.petImgURL} alt={`Mascota: ${pet.petName}`} />
              <div className="info-pet">
                <h3>{pet.petName}</h3>
                <h5>{pet.petLocation}</h5>
              </div>
              <div className="button-container">
                <ButtonPrincipal
                  type="button"
                  className="edit-button"
                  handleClick={() => {}}
                >
                  Reportar
                </ButtonPrincipal>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export { ReportPet, MyReports, EditReportPet, NearbyPets };
