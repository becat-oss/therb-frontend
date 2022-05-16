interface EditPlansState{
  floor: number;
  setFloor: (floor:number) => void;
  northAxis: number;
  setNorthAxis: (northAxis:number) => void;
  layers:Layer[];
  setLayers: (layers:Layer[]) => void;
}