import { Vector } from ".";

describe('Vector', () => {
    const vec = new Vector(1, 1);

    test('rotate', () => {
        expect(vec.rotate(2).x).toBeCloseTo(-1.325);
        expect(vec.rotate(2).y).toBeCloseTo(0.493);
    });

    test('add', () => {
        expect(vec.add(vec)).toEqual(new Vector(2, 2));
    });

    test('subtract', () => {
        expect(vec.subtract(vec)).toEqual(Vector.zero());
    });

    test('multiply', () => {
        expect(vec.multiply(4)).toEqual(new Vector(4, 4));
    });

    test('divide', () => {
        expect(vec.divide(4)).toEqual(new Vector(0.25, 0.25));
    });

    test('dotProduct', () => {
        const vec2 = new Vector(2, 5.5);
        expect(vec.dotProduct(vec2)).toEqual(7.5);
    });
});
