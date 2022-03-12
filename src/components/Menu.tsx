import { ContextMenu, ContextMenuItem, useContextMenuClose } from 'building-editor-react';

export default function MyMenu() {
  const closeContextMenu = useContextMenuClose();

  return (
    <ContextMenu onClose={closeContextMenu}>
      <ContextMenuItem onClick={closeContextMenu}>1</ContextMenuItem>
      <ContextMenuItem onClick={closeContextMenu}>2</ContextMenuItem>
    </ContextMenu>
  );
}
