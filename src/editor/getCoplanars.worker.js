import * as THREE from 'three';
import { getCoplanars,convertToBufferGeometry } from './parseGeometry';

self.onmessage = (event) =>{
    if(event.data){
        const loader = new THREE.ObjectLoader();
        const obj = loader.parse(event.data);
        obj.updateMatrixWorld();
        //const coplanars = getCoplanars(obj);
        const test=convertToBufferGeometry(obj);
        
        self.postMessage(test.toJSON());
    }else{
        self.postMessage(undefined);
    }
}