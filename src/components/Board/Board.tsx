import React from "react";
import {Grid} from "../../features/Grid/Grid";

export interface IBoardProps {
    grid: Grid;
}

const Board: React.FC<IBoardProps> = (props) => {
    return <>{Array(props.grid.rows * props.grid.cols).fill("X").map(x => (<div>{x}</div>))}</>;
}

export default Board;