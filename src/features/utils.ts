import {useState} from "react";

export const useForceUpdate = () => {
    const [x, setX] = useState(1);
    return () => setX(x + 1);
}
