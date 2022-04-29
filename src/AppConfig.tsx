import { EditorConfig } from "building-editor";
import { useMemo } from "react";

interface AppConfig{
  baseEditorConfig: EditorConfig;
  editorConfig: EditorConfig;
}

export function useAppConfig(): AppConfig{

  const baseEditorConfig: EditorConfig = useMemo(() => {
    return {
      'control/viewCubeControls/visible': true,
      'control/viewCubeControls/northDirection': 0,
      'control/orbitControls/enable': true,
      'control/transformControls/enable': false,
      'select/enabled': false,
      'redo/enabled': false,
      'undo/enabled': false,
      'contextmenu/enabled': false,
      'delete/enabled': false,
    };
  }, []);

  const editorConfig:EditorConfig = useMemo(() =>{
    return{
      ...baseEditorConfig,
      'select/enabled': true,
      'redo/enabled': true,
      'undo/enabled': true,
    }
  },[]);

  return {
    baseEditorConfig,
    editorConfig,
  }
}