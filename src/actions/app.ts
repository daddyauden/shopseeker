import { APP } from "./types";

export function setSticky() {
    return {
        type: APP.SET_STICKY,
    };
}

export function removeSticky() {
    return {
        type: APP.REMOVE_STICKY,
    };
}

export function setSidebarSticky() {
    return {
        type: APP.SET_SIDEBAR_STICKY,
    };
}

export function removeSidebarSticky() {
    return {
        type: APP.REMOVE_SIDEBAR_STICKY,
    };
}
