export interface IPoint {
    x: number;
    y: number;
}

export const Point = {
    equals: (point1: IPoint) => (point2: IPoint) => {
        return point1 === point2 || (
            !!point1
            && !!point2
            && point1.x === point2.x
            && point1.y === point2.y
        );
    }
};
