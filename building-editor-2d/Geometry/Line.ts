import { LineCoefficient } from 'building-editor-2d/types';
import { GeometryBase, Point, Rectangle, Vector } from '.';

/**
 * 2D のラインを表すクラス
 */
export class Line extends GeometryBase {
    from: Point;
    to: Point;

    constructor(from: Point, to: Point) {
        super();
        this.from = from;
        this.to = to;
    }

    /**
     * ax -y + b = 0となる各係数を返す
     * @returns 
     */
    calcLineCoefficient(): LineCoefficient {
        const to: Point = this.to;
        const from: Point = this.from;

        const a = -(to.y - from.y) / (to.x - from.x);
        const b = -(a * to.x + to.y);

        return { a: a, b: b };
    }

    /**
     * ax -y + b = 0 となる係数から法線ベクトル (a,-1) を計算する。
     * @returns 
     */
    normal(): Vector {
        const lineCoef: LineCoefficient = this.calcLineCoefficient();
        return new Vector(lineCoef.a, -1);
    }

    length(): number {
        return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + Math.pow(this.to.y - this.from.y, 2));
    }

    middle(): Point {
        return this.from.add(this.to).divide(2);
    }

    getBoundingBox(): Rectangle {
        return new Rectangle(this.to, this.from);
    }

    toVector(): Vector {
        return this.to.subtract(this.from).toVector();
    }

    /**
     * 与えられた点との Closest Point を返す
     * @param point 
     * @returns 
     */
    closestPoint(point: Point): Point {
        const t = this.evaluateClosestPoint(point);

        if (t < 0) {
            return this.from;
        } else if (t > 1) {
            return this.to;
        } else {
            return this.from.add(this.toVector().multiply(t).toPoint());
        }
    }

    /**
     * 与えられた点との Closest Point の Line 上の位置を返す
     * @param point 
     * @returns 
     */
    evaluateClosestPoint(point: Point): number {
        const vecAP = point.subtract(this.from).toVector();
        const vecAB = this.toVector();
        const APAB = vecAP.dotProduct(vecAB);
        const t = APAB / vecAB.length() ** 2;

        return t;
    }

    /**
     * 与えられた引数よりライン上の点を返す
     * @param t 
     * @returns 
     */
    evaluateLine(t: number): Point | null {
        if (t > 1 || t < 0) {
            return null;
        } else {
            return this.from.add(this.toVector().multiply(t).toPoint());
        }
    }

    distance(point: Point): number {
        return this.closestPoint(point).distance(point);
    }

    static createFromSDL(start: Point, direction: Vector, length: number): Line {
        const end = start.add(direction.unit().multiply(length).toPoint());
        return new Line(start, end);
    }
}
