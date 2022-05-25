import { Vector, GeometryBase, Point } from 'building-editor-2d/Geometry';
import { ObjectColor, SnapMode } from 'building-editor-2d/types';
import p5 from 'p5';
import { DrawableObject } from '../Interface';

/**
 * ジオメトリオブジェクトのインターフェース
 */
export interface GeometryObject extends DrawableObject {
    geometry: GeometryBase;
    name: string;
    objectType: string;
    layerName: string;
    isVisible: boolean;
    isSelected: boolean;

    draw(p5: p5, objectColor: ObjectColor, scale: number, isFill: boolean): void;
    snap(p5: p5, snapMode: SnapMode, pan: Vector, scale: number): Point | null;
    mouseDist(p5: p5, pan: Vector, scale: number): number;
}
