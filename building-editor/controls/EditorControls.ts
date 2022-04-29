import * as THREE from 'three';
import { Editor } from '../Editor';

export interface EditorUpdateEvent extends THREE.Event {
  value?: Editor;
}

export class EditorControls extends THREE.EventDispatcher {
  enabled: boolean;

  constructor() {
    super();

    this.enabled = true;
  }

  update(editor: Editor): void {
    if (!this.enabled) return;
    this.dispatchEvent({ type: 'update', value: editor });
  }
}
