import * as THREE from 'three';
import { BuildingSurfaceDetailed, FenestrationSurfaceDetailed, ShadingDetailed } from 'src/AppTypes';
import { color } from 'src/Color';
import { wireframeSuffix } from './useEditor';

const material = new THREE.MeshBasicMaterial({ color: color['wireframe'] }); // green for outline

function isBuildingSurfaceDetailed(arg:any):arg is BuildingSurfaceDetailed{
  return arg.Zone_Name !== undefined;
}

function isFenestrationSurfaceDetailed(arg:any):arg is FenestrationSurfaceDetailed{
  return arg.Building_Surface_Name !== undefined;
}

//FIXME:とりあえずBuildingSurfaceDetailedに関する処理だけを書いておく
export function getSurfacesGeometry(surfaces: BuildingSurfaceDetailed[]): Record<string, THREE.Object3D> {
  const groupByZoneName: Record<string, THREE.Object3D> = {};
  const materialByZoneName: Record<string, any> = {};
  //surfaceの型によって処理を分ける

  surfaces.forEach((surface:BuildingSurfaceDetailed) => {
    // Generate kv pair object: k -> zone name, v -> material (instead of colorByZoneName)
    if (isBuildingSurfaceDetailed(surface)){
      materialByZoneName[surface.Zone_Name] = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, side: THREE.DoubleSide }); // toUpperCase: Temporary for key mapping
    }
    // else if (isFenestrationSurfaceDetailed(surface)){
    //   materialByZoneName[surface.Surface_Type] = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.2, side: THREE.DoubleSide });
    // }
    
  });
  surfaces.forEach((surface:BuildingSurfaceDetailed) => {
    const obj: number[] = [];
    for (let i = 0; i < surface.vertices.length; i = i + 3) {
      obj.push(surface.vertices[i]);
      obj.push(surface.vertices[i + 2]);
      obj.push(surface.vertices[i + 1]);
    }
    const offset = 0;

    const n = new THREE.Vector3().subVectors(
      new THREE.Vector3(obj[3], obj[4], obj[5]),
      new THREE.Vector3(obj[0], obj[1], obj[2]),
    );
    const v2 = new THREE.Vector3().subVectors(
      new THREE.Vector3(obj[6], obj[7], obj[8]),
      new THREE.Vector3(obj[3], obj[4], obj[5]),
    );
    n.cross(v2).normalize();

    const uv = new THREE.Vector3(0, 0, 1);
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(n, uv);
    const m = new THREE.Matrix4();
    m.makeRotationFromQuaternion(q);
    const invM = new THREE.Matrix4();
    invM.copy(m).invert();

    // const group = new THREE.Group();
    let diff;
    const lineSegmentBufferGeometry = new THREE.BufferGeometry();
    const positions = [];
    const shape = new THREE.Shape();
    const edgeNum = Math.round(obj.length / 3);

    for (let i = 0; i < edgeNum; i++) {
      let p0;
      if (i < edgeNum - 1) {
        for (let j = 0; j < 6; j++) {
          positions.push(obj[offset + i * 3 + j]);
        }
        const p = new THREE.Vector3(positions[i * 6], positions[i * 6 + 1], positions[i * 6 + 2]).applyMatrix4(m);

        if (i === 0) {
          p0 = p;
          diff = p0.z;
          shape.moveTo(p0.x, p0.y);
        } else {
          shape.lineTo(p.x, p.y);
        }
      } else {
        for (let j = 0; j < 3; j++) {
          positions.push(obj[offset + i * 3 + j]);
        }
        const p = new THREE.Vector3(positions[i * 6], positions[i * 6 + 1], positions[i * 6 + 2]).applyMatrix4(m);

        positions.push(obj[offset], obj[offset + 1], obj[offset + 2]);
        p && shape.lineTo(p.x, p.y);
        p0 && shape.lineTo(p0.x, p0.y);
      }
    }

    lineSegmentBufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    lineSegmentBufferGeometry.computeBoundingBox();
    const wireframe = new THREE.LineSegments(lineSegmentBufferGeometry, material);
    //TODO:surfaceとfenestrationの違いによる処理の変更の方法を考える必要
    wireframe.name = surface.Zone_Name + wireframeSuffix;

    let mesh;
    try {
      const shapeBufferGeometry = new THREE.ShapeBufferGeometry(shape);
      mesh = new THREE.Mesh(shapeBufferGeometry, materialByZoneName[surface.Zone_Name]);
      mesh.applyMatrix4(invM);
      diff && mesh.position.addScaledVector(n, diff);
      mesh.name = surface.Name;
      // group.add( mesh );
    } catch (err) {
      console.log(err);
    }

    if (mesh) {
      if (!groupByZoneName.hasOwnProperty(surface.Zone_Name)) {
        const group = new THREE.Group();
        //inputのtypeによってgroupのnameを変える
        if (isBuildingSurfaceDetailed(surface)) {
          group.name = surface.Zone_Name;
        }
        // }else if(isFenestrationSurfaceDetailed(surface)){
        //   group.name = surface.Building_Surface_Name;
        // }
        
        group.add(wireframe);
        group.add(mesh);
        groupByZoneName[surface.Zone_Name] = group;
      } else {
        groupByZoneName[surface.Zone_Name].add(wireframe);
        groupByZoneName[surface.Zone_Name].add(mesh);
      }
    }
  });

  return groupByZoneName;
}