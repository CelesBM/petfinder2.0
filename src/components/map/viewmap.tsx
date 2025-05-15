import { useMap } from "react-leaflet";
import { useEffect } from "react";

export function ChangeMapView({
  coords,
}: {
  coords: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], map.getZoom(), {
        animate: true,
      });
    }
  }, [coords]);
  return null;
}
