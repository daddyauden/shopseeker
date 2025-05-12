import _ from "lodash";
import { APP } from "actions/types";

interface ACTION {
    type: string;
    payload: string | object | null;
}

const initialState = {
    isSticky: false,
    isSidebarSticky: true,
    isOpen: false,
};

function App(state = initialState, action: ACTION) {
    switch (action.type) {
        case APP.SET_STICKY:
            return {
                ...state,
                isSticky: true,
            };

        case APP.REMOVE_STICKY:
            return {
                ...state,
                isSticky: false,
            };

        case APP.SET_SIDEBAR_STICKY:
            return {
                ...state,
                isSidebarSticky: true,
            };

        case APP.REMOVE_SIDEBAR_STICKY:
            return {
                ...state,
                isSidebarSticky: false,
            };

        default: {
            return state;
        }
    }
}

export default App;
