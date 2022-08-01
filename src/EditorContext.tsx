import React, { useContext, useState, useMemo } from "react";
import * as THREE from 'three';
//import { EditorContextProps } from "building-editor-react/dist/EditorContext";

// from EditorTypes.tsx
export const editorKeys = {
    inputGeometry: 'inputGeometry',
    selectHelper: 'selectHelper'
} as const;

interface EditorScene{
    [editorKeys.inputGeometry]: THREE.Group;
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
const inputGeometry = new THREE.Group();
inputGeometry.name = editorKeys.inputGeometry;

const selectHelper=new THREE.Group();
selectHelper.name=editorKeys.selectHelper;

export const initialEditorObjects: EditorObjects = {
    inputGeometry,
    selectHelper
};

export const initialState: EditorState={
    editorObjects:{
        [editorKeys.inputGeometry]:initialEditorObjects.inputGeometry,
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