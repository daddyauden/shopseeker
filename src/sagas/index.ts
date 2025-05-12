import { all } from "redux-saga/effects";

import auth from "./auth";
import cart from "./cart";
import mode from "./mode";
import profile from "./profile";
import region from "./region";
import system from "./system";

const root = function* root() {
    yield all([auth(), cart(), mode(), profile(), region(), system()]);
};

export default root;
