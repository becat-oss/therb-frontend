import { EditorConfig } from "building-editor";
import { EventConfig } from "building-editor-react";
import { useMemo } from "react";

interface AppConfig{
    editorConfig: EditorConfig;
    eventConfig: EventConfig;
}

export function useAppConfig(): AppConfig{
    const editorConfig:EditorConfig = useMemo(() =>{
        return{
            'control/viewCubeControls/visible': true,
            'control/transformControls/enable': true,
            'select/enabled':true,
            'redo/enabled': true,
            'undo/enabled': true,
        }
    },[]);
    const eventConfig:EventConfig = useMemo(()=>{
        return{
            'contextmenu/enabled': true,
            'delete/enabled': true,
        }
    },[]);

    return {
        editorConfig,
        eventConfig
    }
}