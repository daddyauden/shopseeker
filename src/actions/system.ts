import _ from "lodash";

import { SYSTEM } from "./types";

export function changeLocation(data: any[]) {
    return {
        type: SYSTEM.CHANGE_LOCATION,
        payload: data,
    };
}

export function changeLocale(data: string) {
    return {
        type: SYSTEM.CHANGE_LOCALE,
        payload: data,
    };
}
