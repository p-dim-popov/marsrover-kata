import React from "react";

export enum BoxType {
    Rover = "R",
    Obstacle = "X",
    Visited = "V",
}

export interface IBoxProps {
    type: BoxType,
}

const Box: React.FC<IBoxProps> = (props) => {
    return <>{props.type}</>;
}

export default Box;