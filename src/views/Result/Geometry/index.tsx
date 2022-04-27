import { Editor } from 'building-editor-react';
import { useAppConfig } from 'src/AppConfig';

export default function Geometry(): React.ReactElement{
  const { editorConfig } = useAppConfig();

  return(
    <>
      <Editor config={editorConfig} />
    </>
  )
}