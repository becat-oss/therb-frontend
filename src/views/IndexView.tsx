import { Provider } from 'building-editor-react';
import Editor from 'src/components/Editor';
import { EditorProvider, EditorContext, useEditorContext } from 'src/EditorContext';
import { AppProvider } from 'src/AppContext';
import { useEditor } from 'src/editor/useEditor';
import Button from '@material-ui/core/Button';

export default function Index() {
  const { loadModelFromLocal } = useEditor();

  return (
    <Provider>   
      <EditorProvider>
        <Editor />
        <Button variant="contained" style={{ position: 'absolute', zIndex: 1, left: 50, top: 50 }} 
          onClick={async(): Promise<void>=>{
          loadModelFromLocal();
        }}>Import Model
        </Button>
      </EditorProvider>
    </Provider>
  );
}
