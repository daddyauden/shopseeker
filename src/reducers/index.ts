import { combineReducers } from "redux";

import app from "./app";
import auth from "./auth";
import cart from "./cart";
import mode from "./mode";
import nav from "./nav";
import profile from "./profile";
import region from "./region";
import system from "./system";

export default combineReducers({
    app,
    auth,
    cart,
    mode,
    nav,
    profile,
    region,
    system,
});
