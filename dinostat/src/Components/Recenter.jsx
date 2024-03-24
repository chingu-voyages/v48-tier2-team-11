import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function Recenter({ lat, lon }) {
  const map = useMap();
  // useEffect(() => {
  // map.setView([lat, lon]);
  map.flyTo([lat, lon]);
  // }, [lat, lon]);
  return null;
}
