import { useState, useCallback } from 'react';

interface ParentSize {
  ref: (node: any) => void;
  width: null | number;
  height: null | number;
}

export function useParentSize(): ParentSize {
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const ref = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return {
    ref,
    width,
    height,
  };
}
