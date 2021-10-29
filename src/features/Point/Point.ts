export class Point {
    constructor(public x: number, public y: number) {}

    equals(point: Point) {
        return !!point && this.x === point.x && this.y === point.y;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}