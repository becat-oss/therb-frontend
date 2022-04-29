import React, { useEffect, useRef } from 'react';
import { useEditor } from '../hooks/useEditor';

type Props = React.HTMLAttributes<HTMLDivElement>;

const ViewCube: React.VFC<Props> = (props) => {
  const { editor } = useEditor();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && !ref.current.firstChild) {
      ref.current.appendChild(editor.viewCubeControls.element);
    }
  }, [editor.viewCubeControls.element]);

  return (
    <div {...props}>
      <div ref={ref} />
    </div>
  );
};

export default ViewCube;
