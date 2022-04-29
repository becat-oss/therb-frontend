import { Provider } from 'building-editor-react';
import Editor from 'src/components/Editor';
import { EditorProvider, EditorContext, useEditorContext } from 'src/EditorContext';
import { AppProvider } from 'src/AppContext';
import { useEditor } from 'src/editor/useEditor';
import Button from '@material-ui/core/Button';

export default function Index() {

  return (
    <Provider>   
      <EditorProvider>
        <Editor />
      </EditorProvider>
    </Provider>
  );
}
