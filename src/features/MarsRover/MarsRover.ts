import {Grid} from "../Grid/Grid";
import {Coordinates, DIRECTIONS_ORDER, DirectionType, ICoordinates} from "../Coordinates/Coordinates";
import {Point} from "../Point/Point";

export enum CommandType {
    Move = "M",
    RotateLeft = "L",
    RotateRight = "R",
}

export interface IMarsRover {
    coordinates: ICoordinates;
    execute(command: string | CommandType[]): string;
}

export interface IMarsRoverConstructor {
    new(grid: Grid): IMarsRover;
}

export const MarsRover: IMarsRoverConstructor = class implements IMarsRover {
    coordinates = new Coordinates("0:0:N");

    constructor(private readonly grid: Grid) {}

    private tryMoveTowardsPoint(point: Point, onSuccess: Function) {
        if (this.grid.hasObstacleOnPoint(point)) {
            this.coordinates.hasObstacles = true;
            return;
        }

        this.coordinates.hasObstacles = false;
        onSuccess();
    }

    private moveForward(): void {
        switch (this.coordinates.direction) {
            case DirectionType.East: {
                const desiredX = (this.coordinates.position.x + 1) % this.grid.cols;
                this.tryMoveTowardsPoint(new Point(desiredX, this.coordinates.position.y), () => this.coordinates.position.x = desiredX)
                break;
            }
            case DirectionType.West: {
                const desiredX = (!this.coordinates.position.x ? this.grid.cols : this.coordinates.position.x) - 1;
                this.tryMoveTowardsPoint(new Point(desiredX, this.coordinates.position.y), () => this.coordinates.position.x = desiredX)
                break;
            }
            case DirectionType.North: {
                const desiredY = (this.coordinates.position.y + 1) % this.grid.rows;
                this.tryMoveTowardsPoint(new Point(this.coordinates.position.x, desiredY), () => this.coordinates.position.y = desiredY);
                break;
            }
            case DirectionType.South: {
                const desiredY = (!this.coordinates.position.y ? this.grid.rows : this.coordinates.position.y) - 1;
                this.tryMoveTowardsPoint(new Point(this.coordinates.position.x, desiredY), () => this.coordinates.position.y = desiredY);
                break;
            }
            default:
                throw new Error("Unknown direction!")
        }
    }

    execute(commands: string | CommandType[]): string {
        if (!commands) {
            throw new Error("Command/s is not valid!");
        }

        for (const _ of typeof commands === "string" ? commands.split(""): commands) {
            const command = _ as CommandType;
            switch (command) {
                case CommandType.Move:
                    this.moveForward();
                    break;
                case CommandType.RotateRight:
                    this.coordinates.direction = DIRECTIONS_ORDER[(DIRECTIONS_ORDER.indexOf(this.coordinates.direction) + 1) % DIRECTIONS_ORDER.length];
                    break;
                case CommandType.RotateLeft:
                    const index = DIRECTIONS_ORDER.indexOf(this.coordinates.direction);
                    this.coordinates.direction = DIRECTIONS_ORDER[(!index ? DIRECTIONS_ORDER.length : index) - 1];
                    break;
                default:
                    throw new Error("Command type not known!");
            }
        }

        return this.coordinates.toString();
    }
}

export default MarsRover;
