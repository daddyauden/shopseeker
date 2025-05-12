import { SYSTEM } from "actions/types";

interface ACTION {
    type: string;
    payload: any;
}

const initialState = {
    installed: false,
    config: {},
    locale: "",
    location: [],
};

function System(state = initialState, action: ACTION) {
    switch (action.type) {
        case SYSTEM.CHANGE_LOCALE:
            return {
                ...state,
                locale: action.payload,
            };

        case SYSTEM.CHANGE_LOCATION:
            return {
                ...state,
                location: action.payload,
            };

        default:
            return state;
    }
}

export default System;
