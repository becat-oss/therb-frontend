import * as THREE from 'three';
import { AnalysisPoint, AnalysisZone, AnalysisLine, AnalysisZoneData, AnalysisGeometry } from 'src/AppTypes';

export function convertCoordinatesToMesh(coordinate: AnalysisPoint[],uniqueName:string, level: number, height: number,color?:string|number='#D1D5DB'):THREE.Mesh{
    const shape = new THREE.Shape();
    coordinate.forEach((c,i)=>{
        if (i === 0){
            shape.moveTo(c[0],c[1]);
        } else {
            shape.lineTo(c[0],c[1]);
        }
    });

    const extrudeSettings = {
        steps:1,
        depth: -height,
        bevelEnabled: false
    };
    console.log('shape',shape);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings).rotateX(Math.PI/2).applyMatrix4(new THREE.Matrix4().makeTranslation(0,level,0));
    const material = new THREE.MeshBasicMaterial({ side:THREE.DoubleSide, color:color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = uniqueName;
    console.log('mesh',mesh);
    return mesh
}

export class Zone {
    zone:AnalysisZone;

    constructor(zone:AnalysisZone){
        this.zone = zone;
    }

    getZoneParentGeometry(zoneData:AnalysisZoneData):AnalysisGeometry | null{
        let geometry: AnalysisGeometry | null = null;
        zoneData.geometries.forEach(geo=>{
            if(geo.zones){
                geo.zones.forEach(zo=>{
                    if(zo.name === this.zone.name){
                        geometry=geo;
                    }
                })
            }
        })
        return geometry;
    }

    getCoordinate(index: number):AnalysisLine{
        const point1 = this.zone.coordinates[index];
        const index2 = index === this.zone.coordinates.length - 1 ? 0:index+1;
        const point2 = this.zone.coordinates[index2];
        return [point1, point2];
    }

    getCoordinatesArea(coordinates: AnalysisPoint[]):number{
        let s = 0;
        for (let i = 0; i < coordinates.length; i++){
            const a = coordinates[i];
            const b = (i < coordinates.length - 1) ? coordinates[i+1] : coordinates[0];
            s += (a[0] * b[1]) - (a[1] * b[0]);
        }
        return s/2
    }

    getCoordinateRotation(): 'left'|'right'{
        const area = this.getCoordinatesArea(this.zone.coordinates);
        return area > 0?'left':'right';
    }

}