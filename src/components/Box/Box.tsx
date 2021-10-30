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
    [BoxType.Rover]: "blue",
    [BoxType.NotVisited]: "gray",
    [BoxType.Obstacle]: "red",
    [BoxType.Visited]: "green",
}

const Box: React.FC<IBoxProps> = ({ type, ...rest }) => {
    return <div className={`p-2 h-10 w-10 bg-${ColorsMap[type]}-900 rounded-full flex items-center justify-center`} {...rest} >{type}</div>;
}

export default Box;
