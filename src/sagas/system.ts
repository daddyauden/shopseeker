import _ from "lodash";
import { takeLatest } from "redux-saga/effects";

import { SYSTEM } from "actions/types";

import { setLocalLocale } from "helpers/locale";

import Locales, { LANGUAGES } from "locales";

const change_locale = function* ({ payload }) {
    if (_.has(LANGUAGES, payload)) {
        setLocalLocale(payload);
        Locales["changeLanguage"](payload);
    }
};

const root = function* root() {
    yield takeLatest(SYSTEM.CHANGE_LOCALE, change_locale);
};

export default root;
