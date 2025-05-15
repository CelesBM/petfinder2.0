import React from "react";
import { useRecoilValue } from "recoil";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { userLocationAtom } from "../../recoil";
import { getLocationFromCoords } from "../../lib/api";
import { ChangeMapView } from "./viewmap";
import "./map.css";

//Icono por defecto para los marcadores
const DefaultIcon = L.icon({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon; //aplica el ícono por defecto globalmente

//Marcador de ubicación al hacer click
function LocationMarker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number, location?: string) => void;
}) {
  const userCoords = useRecoilValue(userLocationAtom);
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const location = await getLocationFromCoords(lat, lng);
      onSelect(lat, lng, location || undefined);
    },
  });
  return userCoords ? (
    <Marker position={[userCoords.lat, userCoords.lng]} />
  ) : null;
}

//Mapa:
export function MapSelector({
  onSelect,
}: {
  onSelect: (lat: number, lng: number, location?: string) => void;
}) {
  const userCoords = useRecoilValue(userLocationAtom);
  return (
    <MapContainer
      center={[-34.7303025, -58.268868]} //coordenadas Quilmes
      zoom={15}
      scrollWheelZoom={true}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "12px",
        marginTop: "1rem",
      }}
    >
      <ChangeMapView coords={userCoords} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}
