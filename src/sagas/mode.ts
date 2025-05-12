import _ from "lodash";
import { put, takeLatest, select, fork } from "redux-saga/effects";

import { LANGUAGES, defaultLocale } from "locales";

import { MODE } from "actions/types";
import {
    initUser,
    initAccount,
    initAddresses,
    initCards,
    updateProvider,
} from "actions/profile";
import { changeLocale, changeLocation } from "actions/system";
import { initRegion } from "actions/region";

import { findBySlug } from "request/region";

import Lib from "helpers/lib";
import { getAuth } from "helpers/profile";
import { getLocalLocale } from "helpers/locale";

const set_location = function* () {
    const { location } = yield select((state) => state.system);

    if (_.isEmpty(location)) {
        try {
            const position = yield Lib.getCurrentPosition();

            if (position) {
                yield put(
                    changeLocation([
                        position.coords.longitude,
                        position.coords.latitude,
                    ])
                );
            }
        } catch (e) {}
    }
};

const set_locale = function* () {
    const { locale } = yield select((state) => state.system);

    const getLanguage = (data) => {
        if (_.has(LANGUAGES, data)) {
            return data;
        } else if (_.has(LANGUAGES, _.split(data, "-")[0])) {
            return _.split(data, "-")[0];
        }

        return "";
    };

    if (!locale) {
        let _locale = yield getLocalLocale() || "";

        if (!_locale) {
            if (typeof window === "object" && "language" in navigator) {
                _locale = getLanguage(navigator.language);
            }
        }

        if (!_locale) {
            _.map(navigator.languages, (language: string) => {
                _locale = getLanguage(language);

                if (_locale !== "") return;
            });
        }

        if (!_locale) {
            _locale = defaultLocale;
        }

        yield put(changeLocale(_locale));
    }

    yield put(changeLocale(locale));
};

const load_region = function* () {
    const { region } = yield select((state) => state);

    if (!_.get(region, "id") || _.isEmpty(region.types)) {
        const region = yield findBySlug({});
        yield put(initRegion(region));
    }
};

const update_profile = function* () {
    const { account } = yield select((state) => state.profile);

    const auth = yield getAuth();

    if (_.isEmpty(account) && !_.isEmpty(auth)) {
        if (_.get(auth, "user", null)) {
            yield put(initUser(auth.user));
        }

        if (_.get(auth, "account", null)) {
            yield put(initAccount(auth.account));
        }

        if (_.get(auth, "addresses", null)) {
            yield put(initAddresses(auth.addresses));
        }

        if (_.get(auth, "cards", null)) {
            yield put(initCards(auth.cards));
        }

        if (_.get(auth, "provider", null)) {
            yield put(updateProvider(auth.provider));
        }
    }
};

const update_state = function* () {
    yield fork(load_region);
    yield fork(set_locale);
    yield fork(set_location);
    yield fork(update_profile);
};

const root = function* () {
    yield takeLatest(MODE.UPDATE_STATE, update_state);
};

export default root;
