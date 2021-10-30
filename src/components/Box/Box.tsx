import React from "react";

export enum BoxType {
    Rover = "R",
    Obstacle = "X",
    Visited = "V",
    NotVisited = "O",
}

export interface IBoxProps {
    type: BoxType,
}

const ColorsMap: Record<BoxType, string> = {
    [BoxType.Rover]: "bg-blue-900",
    [BoxType.NotVisited]: "bg-gray-900",
    [BoxType.Obstacle]: "bg-red-900",
    [BoxType.Visited]: "bg-green-900",
}

const Box: React.FC<IBoxProps> = ({ type, ...rest }) => {
    return <div className={`p-2 h-10 w-10 ${ColorsMap[type]} rounded-full flex items-center justify-center`} {...rest} >{type}</div>;
}

export default Box;
