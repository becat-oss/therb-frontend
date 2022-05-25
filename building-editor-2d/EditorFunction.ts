import p5 from 'p5';
import { CanvasDocument } from 'building-editor-2d/Canvas';
import { snap, zoomExtendAll, addRectangle, panCanvas, selectGeometry } from './Function';

interface EditorFunction {
    [key: string]: {
        caption: string;
        func: (p5: p5, doc: CanvasDocument, args: any) => void;
    };
}

const editorFunction: EditorFunction = {
    'Snap': {
        caption: 'Set Snap Information',
        func: function (p: p5, doc: CanvasDocument): void {
            snap(doc, p);
        },
    },
    'panCanvas': {
        caption: 'Pan Canvas',
        func: function (p: p5, doc: CanvasDocument): void {
            panCanvas(doc, p);
        },
    },
    'Select': {
        caption: 'Select Geometry',
        func: function (p: p5, doc: CanvasDocument): void {
            selectGeometry(doc, p);
        },
    },
    'AddRectangle': {
        caption: "Add Rectangle",
        func: function (p: p5, doc: CanvasDocument): void {
            addRectangle(doc, p);
        },
    },
    'ZoomExtendAll': {
        caption: "Zoom Extend All",
        func: function (p: p5, doc: CanvasDocument): void {
            zoomExtendAll(doc);
        },
    },
};

export { editorFunction };
