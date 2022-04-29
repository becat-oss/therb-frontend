import { useEffect } from 'react';
import { EditorUpdateEvent } from 'building-editor';
import { useActions } from './useActions';
import { useEditor } from './useEditor';

function useInitialRender(): void {
  const { render } = useActions();

  useEffect(() => {
    render();
  }, []);
}

function useInitSetSceneSize(): void {
  const { setSceneSize } = useActions();

  useEffect(() => {
    setSceneSize();
  }, []);
}


function useEditorUpdateEventCatch(): void {
  const { editor, setEditor } = useEditor();

  const updateEditor = (e: EditorUpdateEvent) => {
    e.value && setEditor(e.value);
  };


  useEffect(() => {
    editor.editorControls.addEventListener('update', updateEditor);

    return () => editor.editorControls.removeEventListener('update', updateEditor);
  }, []);
}

export function useInit(): void {
  useInitialRender();
  useInitSetSceneSize();
  useEditorUpdateEventCatch();
}
