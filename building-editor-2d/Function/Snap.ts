import p5 from 'p5';
import { Point } from '../Geometry';
import { ObjectColorSet } from 'building-editor-2d/types';
import { B2DMath } from '../Utils';
import { PointObject } from '../Canvas/Object';
import { CanvasDocument, GeometryObject } from 'building-editor-2d/Canvas';

export function snap(doc: CanvasDocument, p: p5): void {
    const info = doc.canvasInfo;
    const snap = doc.editorState.snap;
    const color: ObjectColorSet = info.colorSet.find(color => color.name === info.colorMode)!;
    let minDist = Number.MAX_VALUE;

    if (snap.mode.endPoint || snap.mode.middle || snap.mode.near) {
        const visibleLayers: string[] = doc.layers
            .filter(layer => layer.isVisible)
            .map(layer => layer.name);
        const visibleObj: GeometryObject[] = doc.geometryObjects
            .filter(obj => visibleLayers.includes(obj.layerName));
        const distArray: number[] = visibleObj
            .map((obj) => obj.mouseDist(p, info.canvasTranslate(), info.scale));

        minDist = Math.min(...distArray);
        const index = distArray.indexOf(minDist);
        if (index >= 0) {
            snap.point = visibleObj[index]
                .snap(p, snap.mode, info.canvasTranslate(), info.scale);

            if (snap.point) {
                new PointObject(snap.point).draw(p, color.default, info.scale, true, 10);
            }
        }
        snap.index = doc.geometryObjects.indexOf(visibleObj[index]);
    }

    if (snap.mode.grid) {
        const gridInterval = info.gridInterval;
        const mousePt: Point = PointObject.mousePt(p, info.canvasTranslate(), info.scale).geometry;
        const gridPt: Point = new Point(B2DMath.round(mousePt.x, gridInterval), B2DMath.round(mousePt.y, gridInterval));
        const gridDist: number = gridPt.distance(mousePt);

        if ((gridDist < minDist || snap.point === null) &&
            p.mouseX > 250 && p.mouseX < p.width - 250) {
            snap.point = gridPt;
            snap.index = -1;
            new PointObject(snap.point).draw(p, color.default, info.scale, true, 10);
        }
    }
}
