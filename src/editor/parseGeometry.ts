import * as THREE from 'three';
import { Geometry, Face3 } from 'three/examples/jsm/deprecated/Geometry';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const FLOOR_RATIO=0.2;
const ANGLE_THRESHOLD=0.01;

export function convertToGeometry(geometry: Geometry | THREE.BufferGeometry): Geometry{
    if (geometry instanceof THREE.BufferGeometry){
        geometry = new Geometry().fromBufferGeometry(geometry);
    }
    return geometry;
}

export function convertToBufferGeometry(geometry: Geometry | THREE.BufferGeometry): THREE.BufferGeometry{
    if (geometry instanceof Geometry){
        geometry = geometry.toBufferGeometry();
    }
    return geometry;
}

export function mergeGeometry(obj:THREE.Object3D, tolerance = 1e-2):THREE.BufferGeometry | null {
    const geometries: THREE.BufferGeometry[] = [];

    obj.traverse((child)=>{
        if (child instanceof THREE.Mesh){
            const geometry = convertToBufferGeometry(child.geometry).clone();//r125以降、Geometryクラスはなくなった
            geometry.applyMatrix4(child.matrixWorld);
            geometries.push(geometry);
            child.updateMatrix();
        }
    });

    const attributes = [];
    for (let i = 0; i < geometries.length; i++){
        const geometry = geometries[i];
        console.log('geometry.attributes',geometry.attributes);
        attributes.push(...Object.keys(geometry.attributes));
    }
    
    const counts: { [index: string]: any} ={};
    
    //merge
    let geometry: THREE.BufferGeometry | null = null;
    if (geometries.length > 0){
        geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
        geometry = geometry && BufferGeometryUtils.mergeVertices(geometry, tolerance);
    }
    return geometry
}

export const getCoplanars = (obj: THREE.Object3D): THREE.BufferGeometry[] =>{
    const BufferGeometry =mergeGeometry(obj);
    return []
}

export function isHorizontalFace(face: Face3): boolean{
    return Math.abs(face.normal.x) < ANGLE_THRESHOLD && Math.abs(face.normal.y)>ANGLE_THRESHOLD && Math.abs(face.normal.z) < ANGLE_THRESHOLD;
}