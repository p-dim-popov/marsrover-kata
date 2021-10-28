import React from "react";

export enum BoxType {
    Rover = "R",
    Obstacle = "X",
    Visited = "V",
    Empty = "O",
}

export interface IBoxProps {
    type: BoxType,
}

const Box: React.FC<IBoxProps> = (props) => {
    return <div className="p-2 bg-gray-900">{props.type}</div>;
}

export default Box;