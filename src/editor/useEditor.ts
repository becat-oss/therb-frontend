import { useCallback, useMemo, useEffect } from "react";
import { useActions, useEditorState, EditorState } from "building-editor-react";
import { useEditorContext, editorKeys, EditorObjects } from "src/EditorContext";
import * as THREE from 'three';
import { useWebWorker } from "src/utils/useWebWorker";
import { convertToGeometry } from "./parseGeometry";
import { AnalysisZone } from "src/AppTypes";
import { useAppContext } from "src/AppContext";
import { convertCoordinatesToMesh, Zone } from "./zone";
import { normalVectorOfWall, wallCenterPoint } from "src/utils/geometry";

interface InteractiveObject {
    object: THREE.Object3D | null;
}

interface BuildingEditorBridge {
    editorState: EditorState;
    scene: THREE.Scene;
    loadModelFromLocal:() => void;
    setEstimateLevels: () => void;
    lookAt:(object:THREE.Object3D)=>void;
    addZoneGeometry: () => void;
    setExteriorWalls:() => void;
    addObject:<K extends keyof EditorObjects>(key:K, object: THREE.Object3D) => void;
    removeObject: (object:THREE.Object3D)=> void;
    clearObject: <K extends keyof EditorObjects>(key:K) => void;
    setObjectVisibility: <K extends keyof EditorObjects>(key: K,visible: boolean) =>void;
    setObjectVisibilities: (visibilities: Partial<ObjectVisibilities>)=>void
    zones: AnalysisZone[];
}

type ObjectVisibilities = {
    [key in keyof EditorObjects]: boolean
}

export function useEditor(): BuildingEditorBridge{
    const editorState=useEditorState();
    const{ scene,raycaster } = editorState;
    const actions = useActions();
    const { loadFileFromLocal, focus, removeObject:beRemoveObject, addObject:beAddObject, render }=actions;
    const { editorObjects, setEditorObjects } = useEditorContext();
    const {zoneData, setZoneData }=useAppContext();

    const zones:AnalysisZone[] = [{
        name:'test',
        coordinates:[[0,0],[5,0],[5,5],[0,5]],
        program: 'office',
        exteriorWalls:[0,1,2,3],
        space_type: 'office',
        wwr:[40,40,40,40]
    }]

    const addObject = useCallback(<K extends keyof EditorObjects>(key:K, object: THREE.Object3D)=>{
        const parent = editorObjects[key];
        beAddObject(object,parent);
        setEditorObjects({...editorObjects, [key]: parent});
        render();
    },[beAddObject])

    const removeObject = useCallback((object:THREE.Object3D)=>{
        beRemoveObject(object);
    },[beRemoveObject]);

    const clearObject = useCallback(<K extends keyof EditorObjects>(key:K)=>{
        const parent = editorObjects[key];
        for (let i = parent.children.length -1; i>=0;i--){
            removeObject(parent.children[i]);
        }
    },[editorObjects,removeObject])

    const setObjectVisibility = useCallback(<K extends keyof EditorObjects>(key:K, visible:boolean)=>{
        const parent = editorObjects[key];
        parent.visible = visible;
        render();
    },[editorObjects, render]);

    const setObjectVisibilities = useCallback((visibilities:Partial<ObjectVisibilities>)=>{
        Object.keys(visibilities).forEach(key=>{
            const value = visibilities[key as keyof Partial<ObjectVisibilities>];
            setObjectVisibility(key as any, value as any);
        });
    },[setObjectVisibility]);

    const addZoneGeometry = useCallback(()=>{
        clearObject(editorKeys.zoneGeometry);
        console.log('editorKeys.zoneGeometry',editorKeys.zoneGeometry);
        zoneData.geometries.forEach((g)=>{
            g.zones && g.zones.forEach((zone)=>{
                const mesh = convertCoordinatesToMesh(zone.coordinates, zone.name, g.level, g.height);

                if (Array.isArray(mesh.material)){
                    mesh.material.forEach(m=>{
                        m.transparent = true;
                        m.opacity = 0.5;
                    });
                } else {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 0.5;
                }
                console.log('mesh to add zoneGeometry',mesh);
                addObject(editorKeys.zoneGeometry, mesh);
                const geo = new THREE.EdgesGeometry(mesh.geometry);
                const mat = new THREE.LineBasicMaterial({linewidth: 1});
                const wireframe = new THREE.LineSegments(geo,mat);
                wireframe.name = zone.name + "_wireframe";
                addObject(editorKeys.zoneGeometry,wireframe);
            })
        });
    },[addObject, editorObjects.zoneGeometry,zoneData.geometries]);

    const setExteriorWalls = useCallback(()=>{
        const zoneGeometry = editorObjects[editorKeys.zoneGeometry];
        zoneData.geometries.forEach((g,gi)=>{
            g.zones && g.zones.forEach((zone, zonei)=>{
                zone.exteriorWalls=[];
                const z = new Zone(zone);
                const rotation = z.getCoordinateRotation();

                zone.coordinates.forEach((_,i)=>{
                    const [c, nextC]=z.getCoordinate(i);
                    const direction = normalVectorOfWall(c, nextC, rotation);
                    const origin = wallCenterPoint(c,nextC, g.level, g.height).add(direction.multiplyScalar(0.1));
                    raycaster.set(origin, direction);

                    const intersectObject = raycaster.intersectObject(zoneGeometry, true).filter(i=>i.distance>0.1 && i.object instanceof THREE.Mesh);

                    if (intersectObject.length === 0){
                        zone.exteriorWalls.push(i);
                    }
                });
                zoneData.geometries[gi].zones[zonei] = zone;
            });
        });
        //console.log('zoneData',zoneData.geometries);
        setZoneData(zoneData);
    },[])
    const lookAt = useCallback((obj:THREE.Object3D):void => {
        focus(obj);
    },[focus]);

    const getObjectSize = useCallback((obj:THREE.Object3D): THREE.Vector3 =>{
        const boundingBox = new THREE.Box3().setFromObject(obj);
        const size = boundingBox.getSize(new THREE.Vector3());
        return size
    },[])

    const scaleObject = useCallback((obj: THREE.Object3D, scale: number):THREE.Object3D =>{
        obj.scale.set(obj.scale.x * scale,obj.scale.y * scale,obj.scale.z * scale);
        return obj
    },[])

    const validateModel = useCallback((obj: THREE.Object3D | undefined):THREE.Object3D | null =>{
        if (!obj) return null;

        const size = getObjectSize(obj);
        const modelScaleLimit =1000;

        if (size.x >modelScaleLimit || size.y > modelScaleLimit || size.z > modelScaleLimit){
            const res = window.confirm('will you?');

            if (res) return scaleObject(obj, 1/1000);
        }

    },[])

    const onLoadModel = useCallback((obj: THREE.Object3D | undefined, file: File): void=>{
        console.log('obj', obj);
        const validatedObj = validateModel(obj);
        validatedObj.traverse(child => {
            if (child instanceof THREE.Mesh){
                if (child.material instanceof THREE.Material){
                    child.material.clipShadows = true;
                    child.material.shadowSide = THREE.DoubleSide;
                    child.material.transparent = true;
                    child.material.opacity = 0.2;
                    child.material.side = THREE.DoubleSide;
                }else if (Array.isArray(child.material) && child.material.length > 0 && child.material[0] instanceof THREE.Material){
                    console.log("mat");
                    (child.material as THREE.Material[]).forEach(mat =>{
                        mat.clipShadows = true;
                        mat.shadowSide = THREE.DoubleSide;
                        mat.transparent = true;
                        mat.opacity = 0.5;
                        mat.side = THREE.DoubleSide;
                        // @ts-ignore
                        if(mat.color){
                            // @ts-ignore
                            mat.color = new THREE.Color('#D1D5DB');
                        }

                        if (child.material.emissive){
                            child.material.emissive = new THREE.Color('#D1D5DB');
                        }
                    })
                }
            } 
        });
        lookAt(validatedObj);
    },[]);
    //const onLoadModelFromLocal = useCallback(obj: THREE.Object3D | underfined, file: File) =>{       
    //}
    const loadModelFromLocal = useCallback((): void =>{
        beAddObject(editorObjects.userObject);
        loadFileFromLocal(editorObjects.userObject,onLoadModel);
        console.log('editorObjects.userObject', editorObjects.userObject);
    },[]);

    const getCoplanarsWorker = useMemo(()=> new Worker(new URL('./getCoplanars.worker.js',import.meta.url)),[]);
    const { response: resGetCoplanar, exec: execGetCoplanar } = useWebWorker<string[]>(getCoplanarsWorker);
    const setEstimateLevels = useCallback(async ()=>{
        editorObjects.userObject.updateMatrixWorld();
        await execGetCoplanar(editorObjects.userObject.toJSON());
        
    },[editorObjects.userObject, execGetCoplanar]);

    useEffect(()=>{
        if(resGetCoplanar){
            console.log('resGetCoplanar',resGetCoplanar);
        }
    },[resGetCoplanar]);
    
    return{
        zones,
        editorState,
        scene,
        lookAt,
        addObject,
        removeObject,
        clearObject,
        addZoneGeometry,
        setExteriorWalls,
        loadModelFromLocal,
        setEstimateLevels,
        setObjectVisibility,
        setObjectVisibilities
    }
}