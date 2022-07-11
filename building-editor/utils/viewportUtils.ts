interface ViewSize {
  width: number;
  height: number;
  aspect: number;
}

export function getViewportSize(viewportElement: HTMLElement): ViewSize | null {
  // const viewportElement = document.getElementById('building-editor-viewport');
  if (!viewportElement) return null;
  const viewport = viewportElement.getBoundingClientRect();

  const width = viewport.width;
  const height = viewport.height;

  return { width, height, aspect: height / width };
}

export function getViewSize(dom: HTMLElement): ViewSize {
  const viewportSize = getViewportSize(dom);
  const width = viewportSize ? viewportSize.width : window.innerWidth;
  const height = viewportSize ? viewportSize.height : window.innerHeight;

  return { width, height, aspect: height / width };
}
