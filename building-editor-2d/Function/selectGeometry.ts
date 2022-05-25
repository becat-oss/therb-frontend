import p5 from 'p5';
import { PointObject, PolylineObject } from '../Canvas/Object';
import { CanvasDocument } from 'building-editor-2d/Canvas';

export function selectGeometry(doc: CanvasDocument, p: p5): void {
    if (p.mouseIsPressed && p.mouseX > 250 && p.mouseX < p.width - 250 &&
        doc.geometryObjects.length >= 1) {
        const visibleLayers = doc.layers.filter(layer => layer.isVisible).map(layer => layer.name);
        if (visibleLayers.length === 0) {
            return;
        }
        const plineObj: PolylineObject[] = doc.geometryObjects
            .filter(obj => visibleLayers.includes(obj.layerName))
            .filter(obj => obj.objectType === 'Polyline') as PolylineObject[];
        const mousePt = PointObject.mousePt(p, doc.canvasInfo.canvasTranslate(), doc.canvasInfo.scale).geometry;
        const selectObj = plineObj
            .find(obj => obj.geometry.pointInCurve(mousePt));
        if (selectObj !== undefined) {
            selectObj.isSelected = true;
        }
    } else if (p.keyIsDown(p.BACKSPACE)) {
        doc.geometryObjects = doc.geometryObjects.filter(obj => !obj.isSelected);
    } else if (p.keyIsDown(p.ESCAPE)) {
        doc.geometryObjects.forEach(obj => obj.isSelected = false);
    }
}
