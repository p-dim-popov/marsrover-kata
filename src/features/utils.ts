export const isNullNanUndefinedOrEmptyString = (value: any): boolean => {
    return value === null || value === void 0 || Number.isNaN(value) || value === "";
}

export const stringifyCoordinates = (row?: number, col?: number, direction?: string, hasObstacles?: boolean | string) => {
    let result = `${row}:${col}:${direction}`;
    switch (typeof hasObstacles) {
        case "boolean":
            if (hasObstacles) {
                result = "O:" + result;
            }
            break;
        case "string":
            result = hasObstacles + result;
            break;
        default:
            break;
    }

    return result;
}