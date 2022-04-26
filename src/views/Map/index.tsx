import { FeatureGroup, MapContainer,TileLayer,useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';

export default function Map(){
  return(
    <MapContainer center={[33.58,130.22]} zoom={13} scrollWheelZoom={true}  style={{ height: "100vh" }}>
      <FeatureGroup>
        <EditControl 
          position="topright" 
          draw={{rectangle:false}}
          onCreated={(e)=>{
            console.log(e);
            e.Layer._latlngs
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
  )
}