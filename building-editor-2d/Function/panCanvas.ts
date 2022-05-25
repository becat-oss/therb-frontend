import p5 from 'p5';
import { Point } from '../Geometry';
import { CanvasDocument } from 'building-editor-2d/Canvas';

export function panCanvas(doc: CanvasDocument, p: p5): void {
    const info = doc.canvasInfo;
    const pan = new Point(
        p.pmouseX - p.mouseX,
        p.pmouseY - p.mouseY,
    ).divide(info.scale);
    info.drawCenter = info.drawCenter.add(pan);

    const canvasObject = doc.canvasObject;
    canvasObject.orientation.drawCenter = info.drawCenter;
    canvasObject.scaleBar.drawCenter = info.drawCenter;
}
