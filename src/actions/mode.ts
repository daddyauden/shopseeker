import { MODE } from "./types";

export function updateState(status: string, data: object = {}) {
    return {
        type: MODE.UPDATE_STATE,
        status,
        payload: data,
    };
}
