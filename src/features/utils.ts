import {useState} from "react";

export const isNullNanUndefinedOrEmptyString = (value: any): boolean => {
    return value === null || value === void 0 || Number.isNaN(value) || value === "";
}

export const useForceUpdate = () => {
    const [x, setX] = useState(1);
    return () => setX(x + 1);
}
