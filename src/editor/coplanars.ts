import { Geometry, Face3 } from "three/examples/jsm/deprecated/Geometry";
import { isHorizontalFace } from "./parseGeometry";

interface HorizontalGeometries {
    [index: number]: Geometry;
}

export default class Coplanars {
    coplanars: THREE.BufferGeometry[];
    geometry: Geometry;
    maxFaceSize: number;

    constructor(geometry: Geometry){
        this.coplanars=[];
        this.maxFaceSize=0.1;
        geometry.computeFaceNormals();
        this.geometry = geometry;
        //this.clearMicroFaces();

    }

    private setCoplanars(): void{
        const horizontalGeometries: HorizontalGeometries ={};
        const nonHorizontalGeometries: Geometry[]=[];
        const scope = this;
        const faces = this.geometry.faces;

        function setFace(face: Face3):void{
            //Horizontal
            if (isHorizontalFace(face)){
                const height = Math.floor(scope.geometry.vertices[face.a].y);
                
            }
        }
    }
    // private clearMicroFaces():void{
    //     for (let i = 0; i < this.geometry.faces.length; i++){
            
    //     }
    // }
}