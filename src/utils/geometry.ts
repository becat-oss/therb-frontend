import * as THREE from 'three';
import { AnalysisPoint } from 'src/AppTypes';

export function wallCenterPoint(p1: AnalysisPoint, p2: AnalysisPoint, level: number, height: number):THREE.Vector3{
    return new THREE.Vector3((p1[0] + p2[0]) / 2, level + height / 2, (p1[1] + p2[1]) / 2);
}
export function normalVectorOfWall(point: AnalysisPoint, nextPoint: AnalysisPoint, rotation: 'left'|'right'):THREE.Vector3{
    const vector = new THREE.Vector3(nextPoint[0]-point[0],0,nextPoint[1]-point[1]);

    const axis = new THREE.Vector3(0,1,0);
    const angle = rotation ==='left'? Math.PI/2 : -Math.PI/2;

    vector.applyAxisAngle(axis,angle);
    vector.normalize();

    return vector;
}