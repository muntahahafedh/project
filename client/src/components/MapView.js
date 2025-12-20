import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";

// تصحيح أيقونات الماركارات الافتراضية للنسخة 4
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export function MapView({ places = [] }) {
  const navigate = useNavigate();
  const items = Array.isArray(places) ? places : [];

  const defaultPosition = items.length
    ? [items[0].lat, items[0].lng]
    : [0, 0];

  return (
    <div className="map-view">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={() => navigate("/home")}>
          ← Back
        </button>
        <h2>Nearby Places</h2>
      </div>

      {/* الخريطة */}
      <div className="map-container">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {items.map((place) => (
            <Marker key={place.id} position={[place.lat, place.lng]}>
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.address || ""}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* رسالة إذا ما في أماكن */}
      {items.length === 0 && (
        <div className="no-places">
       
       
        </div>
      )}
    </div>
  );
}
