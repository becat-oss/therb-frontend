import p5 from 'p5';
import { Vector, Rectangle, Point } from 'building-editor-2d/Geometry';
import { CurveSnap } from '../Interface';
import { GeometryObject } from "./GeometryObject";
import { LineObject, PolylineObject } from '.';
import { ObjectColor, SnapMode } from 'building-editor-2d/types';

//TODO: polyline と共通化する（CurveObject？を作る）
export class RectangleObject implements GeometryObject, CurveSnap {
    geometry: Rectangle;
    name: string;
    layerName: string;
    objectType = "Rectangle";
    isVisible = true;
    isSelected = false;

    constructor(geometry: Rectangle, name = "", layerName = "default") {
        this.geometry = geometry;
        this.name = name;
        this.layerName = layerName;
    }

    toLineObjects(): LineObject[] {
        return this.geometry.toLineArray().map(line => new LineObject(line));
    }

    toPolylineObject(): PolylineObject {
        return new PolylineObject(this.geometry.toPolyline(), this.name, this.layerName);
    }

    draw(p5: p5, color: ObjectColor, scale: number, isFill = false): void {
        this.toPolylineObject().draw(p5, color, scale, isFill);
    }

    mouseDist(p5: p5, pan: Vector, scale: number): number {
        return this.toPolylineObject().mouseDist(p5, pan, scale);
    }

    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null {
        let pt: Point | null = null;
        if (snapMode.near) {
            const snapPt = this.snapNear(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        if (snapMode.endPoint) {
            const snapPt = this.snapEndPoint(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        if (snapMode.middle) {
            const snapPt = this.snapMiddle(p5, pan, scale);
            pt = snapPt ? snapPt : pt;
        }
        return pt;
    }

    snapNear(p5: p5, pan: Vector, scale: number, distance = 50): Point | null {
        const lineArray = this.toLineObjects();

        for (let i = 0; i < lineArray.length; i++) {
            const pt = lineArray[i].snapNear(p5, pan, scale, distance);
            if (pt) {
                return pt;
            }
        }

        return null;
    }

    snapMiddle(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const lineArray = this.toLineObjects();

        for (let i = 0; i < lineArray.length; i++) {

            const pt = lineArray[i].snapMiddle(p5, pan, scale, distance);
            if (pt) {
                return pt;
            }
        }

        return null;
    }

    snapEndPoint(p5: p5, pan: Vector, scale: number, distance = 30): Point | null {
        const lineArray = this.toLineObjects();

        for (let i = 0; i < lineArray.length; i++) {
            const pt = lineArray[i].snapEndPoint(p5, pan, scale, distance);
            if (pt) {
                return pt;
            }
        }

        return null;
    }
}
