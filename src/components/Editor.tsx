import { Editor, ViewCube, useEvents,useActions, useEditorState } from 'building-editor-react';
import MyMenu from './Menu';
import * as THREE from 'three';
import { useEffect } from 'react';
import { Button, makeStyles, Theme }from '@material-ui/core';
import { useEditor } from 'src/editor/useEditor';
import { useAppConfig } from 'src/AppConfig';


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial();
const box = new THREE.Mesh(geometry, material);

export default function MyEditor() {
  useEvents();
  const{ selected }=useEditorState();
  const { editorConfig } = useAppConfig();
  
  // console.log('selected object is',selected);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Editor contextMenu={<MyMenu />} config={editorConfig}/>
      
      <ViewCube style={{ position: 'absolute', zIndex: 1, left: 50, bottom: 50 }} />
    </div>
  );
}
