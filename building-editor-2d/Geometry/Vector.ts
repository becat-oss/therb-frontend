import { GeometryBase, Point, Rectangle } from '.';

/**
 * 2D のベクトルを表すクラス
 */
export class Vector extends GeometryBase {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    static zero(): Vector {
        return new Vector(0, 0);
    }

    static unitX(): Vector {
        return new Vector(1, 0);
    }

    static unitY(): Vector {
        return new Vector(0, 1);
    }

    unit(): Vector {
        return new Vector(this.x / this.length(), this.y / this.length());
    }

    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    rotate(radian: number): Vector {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        return new Vector(x, y);
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(number: number): Vector {
        return new Vector(this.x * number, this.y * number);
    }

    divide(number: number): Vector {
        return new Vector(this.x / number, this.y / number);
    }

    dotProduct(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    }

    toPoint(): Point {
        return new Point(this.x, this.y);
    }

    getBoundingBox(): Rectangle {
       return this.toPoint().getBoundingBox(); 
    }
}
