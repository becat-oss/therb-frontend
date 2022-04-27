import { MapProvider } from "./mapContext";
import { Map } from 'src/views/Map/map';
import InputSidebar from "./InputSideBar";

export default function MapIndex(){
  return(
    <MapProvider>
      <InputSidebar/>
      <Map/>
    </MapProvider>
  )
}