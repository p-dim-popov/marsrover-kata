export interface IPoint {
    x: number;
    y: number;
}

export class Point implements IPoint {
    static clone(point: IPoint): Point {
        return new Point(point.x, point.y);
    }

    constructor(public x: number, public y: number) {}

    equals(point: Point) {
        return !!point && this.x === point.x && this.y === point.y;
    }

    clone(): Point {
        return Point.clone(this);
    }
}

export default Point;
