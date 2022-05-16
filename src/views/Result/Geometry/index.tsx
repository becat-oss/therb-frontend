import { Editor,Provider } from 'building-editor-react';
//import Editor from 'src/components/Editor';
import { useAppConfig } from 'src/AppConfig';
import { EditorProvider } from 'src/EditorContext';
import { AppProvider, useAppContext } from 'src/AppContext';
import { useEffect } from 'react';
import { useEditor } from 'src/editor/useEditor';
import SideForm from './SideForm';
import { GeometryProvider } from './GeometryContext';
import EditParamDialog from './EditParamDialog';

export default function Geometry(): React.ReactElement{
  const { editorConfig } = useAppConfig();
  const { geometry } = useAppContext();
  const { addGeometry,scene } =useEditor();

  useEffect(()=>{
    if(geometry){
      addGeometry()
    }
  },[geometry]);

  return(
    <AppProvider>
      <Provider>
        <EditorProvider>
          <GeometryProvider>
            <SideForm />
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Editor config={editorConfig}/>
            </div>
            <EditParamDialog />
          </GeometryProvider>
        </EditorProvider>  
      </Provider>
    </AppProvider>
  )
}