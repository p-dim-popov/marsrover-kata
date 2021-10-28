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

const Box: React.FC<IBoxProps> = ({ type, ...rest }) => {
    return <div className="p-2 bg-gray-900" {...rest} >{type}</div>;
}

export default Box;