import React, { useContext, useState, useMemo } from "react";
import * as THREE from 'three';
import { EditorContextProps } from "building-editor-react/dist/EditorContext";

// from EditorTypes.tsx
export const editorKeys = {
    userObject: 'userObject',
    zoneGeometry: 'zoneGeometry',
    selectHelper: 'selectHelper'
} as const;

interface EditorScene{
    [editorKeys.userObject]: THREE.Group;
    [editorKeys.zoneGeometry]: THREE.Group;
}

interface EditorSceneHelper{
    [editorKeys.selectHelper]: THREE.Group;
}

export type EditorObjects = EditorScene & EditorSceneHelper;

export interface EditorState {
    editorObjects: EditorObjects,
    setEditorObjects: (newEditorObjects: EditorObjects) => void;
}

// from initialEditorObjects.tsx
const userObject=new THREE.Group();
userObject.name = editorKeys.userObject;

const zoneGeometry = new THREE.Group();
zoneGeometry.name = editorKeys.zoneGeometry;

const selectHelper=new THREE.Group();
selectHelper.name=editorKeys.selectHelper;

export const initialEditorObjects: EditorObjects = {
    userObject,
    zoneGeometry,
    selectHelper
};

export const initialState: EditorState={
    editorObjects:{
        [editorKeys.userObject]:initialEditorObjects.userObject,
        [editorKeys.zoneGeometry]:initialEditorObjects.zoneGeometry,
        [editorKeys.selectHelper]:initialEditorObjects.selectHelper
    },
    setEditorObjects: ()=>{}
}

export const EditorContext = React.createContext<EditorState>(initialState);

interface EditorProviderProps {
    children: React.ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps): React.ReactElement {
    const [ editorObjects, setEditorObjects ] = useState<EditorObjects>(initialState.editorObjects);

    const editorState = useMemo((): EditorState =>{
        return {
            editorObjects,
            setEditorObjects
        };
    },[editorObjects]);

    return <EditorContext.Provider value={editorState}>{children}</EditorContext.Provider>;
}

export function useEditorContext(): EditorState{
    return useContext(EditorContext);
}