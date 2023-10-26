import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { observer } from "mobx-react-lite";

interface RestaurantMapProps {
  longitude: number;
  latitude: number;
}

function RestaurantMap({ longitude, latitude }: RestaurantMapProps) {
  return (
    <div>
      <MapContainer
        style={{ width: "500px", height: "300px" }}
        zoom={15}
        center={[latitude, longitude]}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        <TileLayer
          attribution='aydev coding'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} position={[latitude, longitude]}>
          <Popup>
            To<br />
            be <br />
            continued...
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default observer(RestaurantMap); // RestaurantMap bileşenini observer ile sarmalayın
