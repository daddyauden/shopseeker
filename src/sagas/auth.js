import _ from "lodash";
import { put, call, takeLatest } from "redux-saga/effects";

import { ACCOUNT, MERCHANT, DELIVER, COMMISSION } from "graphql/query";

import Config from "config";
import { trans } from "locales";
import { API_SIGNIN, API_SIGNUP, APP_PAGE } from "config/route";

import Log from "helpers/log";
import Lib from "helpers/lib";
import fetch from "helpers/fetch";
import { encrypt } from "helpers/encrypt";
import { setToken, removeToken } from "helpers/profile";

import { AUTH } from "actions/types";
import {
    signupSuccess,
    signupFailure,
    signinSuccess,
    signinFailure,
    signoutSuccess,
} from "actions/auth";
import {
    initUser,
    updateProvider,
    resetProfile,
    initProfile,
    initMerchant,
    initDeliver,
    initCommission,
} from "actions/profile";
import { clearCart } from "actions/cart";
import { changeLocale } from "actions/system";

import { createAccount } from "request/account";

const handlePostRequest = async (host, data, isEncrypt = true) => {
    try {
        return await fetch(
            host,
            "POST",
            isEncrypt
                ? {
                      ie: true,
                      data: encrypt(data),
                  }
                : data
        );
    } catch (e) {
        console.info(e);
    }
};

async function queryFacebookAPI(access_token, path, args) {
    const res = await fetch(
        `https://graph.facebook.com/${path}?access_token=${access_token}&fields=${_.join(
            args,
            ","
        )}`
    );

    const data = await res.json();

    return data;
}

const skip_signin = function* () {
    window.location.href = APP_PAGE;
};

const _signup = function* (profile) {
    const res = yield call(handlePostRequest, API_SIGNUP, profile);

    if (_.has(res, "user")) {
        if (_.get(profile, "type") === "account" && _.get(res, "user.id")) {
            const { status } = yield call(createAccount, {
                uid: _.get(res, "user.id"),
                ...profile,
            });

            if (status === "failed") {
                return {
                    status: "failed",
                    data: trans("failed"),
                };
            }
        }

        return {
            status: "succeeded",
            data: {
                token: _.get(res, "jwt", ""),
                user: res.user,
            },
        };
    } else if (_.has(res, "error") && _.has(res, "message")) {
        let message = "";

        if (_.isString(res.message)) {
            message = res.message;
        } else if (!_.isEmpty(res.message)) {
            message = _.has(res.message, "id")
                ? trans(res.message.id)
                : res.message.message;
        }

        return {
            status: "failed",
            data: message,
        };
    } else {
        return {
            status: "failed",
            data: trans("error.unknown"),
        };
    }
};

const signup = function* ({ payload, callback }) {
    let profile = payload;

    let signupRes = {
        status: "failed",
        data: null,
    };

    Lib.showToast({
        message: trans("signup") + "...",
        type: "loading",
    });

    try {
        signupRes = yield call(_signup, profile);

        const { status, data } = signupRes;

        if (status === "succeeded") {
            const { token, user } = data;

            const userData = {
                id: user.id,
                confirmed: user.confirmed,
                blocked: user.blocked,
                provider: user.provider || "local",
                username: user.username,
                email: user.email,
                type: user.type || "account",
            };

            return yield put(
                signupSuccess(
                    {
                        message: trans("signup_success_content", {
                            email: userData.email,
                        }),
                        token,
                        user: {
                            ...userData,
                            password: profile.password,
                        },
                    },
                    callback.success
                )
            );
        } else {
            return yield put(
                signupFailure(
                    {
                        message: data,
                    },
                    callback.fail
                )
            );
        }
    } catch (e) {
        Log(e);

        return yield put(
            signupFailure(
                {
                    message: e.message,
                },
                callback.fail
            )
        );
    }
};

const signup_success = function* ({ payload, callback }) {
    Lib.showToast({
        message: _.get(payload, "message", trans("succeeded")),
        type: "success",
        duration: 5,
        onClose: callback || (() => (window.location.href = APP_PAGE)),
    });
};

const signup_fail = function* ({ payload, callback }) {
    Lib.showToast({
        message: _.get(payload, "message", trans("failed")),
        type: "error",
        duration: 5,
        onClose: callback || (() => (window.location.href = APP_PAGE)),
    });
};

const _signinFacebook = function* (data) {
    let tokens = {};
    let profile = {
        provider: "facebook",
    };

    if (_.has(data, "profile")) {
        profile = {
            ...profile,
            ..._.get(data, "profile"),
        };
    }

    if (_.has(data, "access_token")) {
        tokens = {
            access_token: data.access_token,
        };

        const user = yield queryFacebookAPI(data.access_token, "/me", [
            "id",
            "email",
            "first_name",
            "last_name",
            "gender",
            "birthday",
            "picture.type(large)",
        ]);

        if (!_.isEmpty(user)) {
            profile = _.assign(profile, _.omit(user, "picture"));

            if (_.has(user, "picture")) {
                _.set(profile, "avatar", _.get(user, "picture.data.url"));
            }

            if (_.has(user, "first_name")) {
                _.set(profile, "nickname", _.get(user, "first_name"));
            }
        }
    }

    return {
        tokens,
        profile,
    };
};

const _signinGoogle = function* (data) {
    let tokens = {};
    let profile = {
        provider: "google",
    };

    if (_.has(data, "access_token")) {
        tokens = {
            id_token: data.id_token,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        };
    }

    if (_.has(data, "profile")) {
        profile = {
            ...profile,
            ..._.pick(data.profile, ["email"]),
        };

        if (_.has(data, "profile.sub")) {
            _.set(profile, "id", _.get(data, "profile.sub"));
        }

        if (_.has(data, "profile.picture")) {
            _.set(profile, "avatar", _.get(data, "profile.picture"));
        }

        if (_.has(data, "profile.family_name")) {
            _.set(profile, "last_name", _.get(data, "profile.family_name"));
        }

        if (_.has(data, "profile.given_name")) {
            _.set(profile, "first_name", _.get(data, "profile.given_name"));
            _.set(profile, "nickname", _.get(data, "profile.given_name"));
        }

        if (_.has(data, "profile.locale")) {
            _.set(profile, "language", data.profile.locale);
            yield put(changeLocale(data.profile.locale));
        }
    }

    return {
        tokens,
        profile,
    };
};

const _signinApple = function* (data) {
    let tokens = {};
    let profile = {
        provider: "apple",
    };

    if (_.has(data, "access_token")) {
        tokens = {
            id_token: data.id_token,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        };
    }

    if (
        _.has(data, "jwt.id_token.payload") &&
        !_.isEmpty(_.get(data, "jwt.id_token.payload", {}))
    ) {
        const user = _.get(data, "jwt.id_token.payload");

        if (_.has(user, "sub")) {
            _.set(profile, "id", _.join(_.split(user.sub, "."), "_"));
        }
    }

    return {
        tokens,
        profile,
    };
};

const _signin = function* (profile) {
    const res = yield call(handlePostRequest, API_SIGNIN, profile);

    if (_.has(res, "jwt")) {
        return {
            status: "succeeded",
            data: {
                token: res.jwt,
                user: res.user,
            },
        };
    } else if (_.has(res, "error") && _.has(res, "message")) {
        let message = "";

        if (_.isString(res.message)) {
            message = res.message;
        } else if (!_.isEmpty(res.message)) {
            message = _.has(res.message, "id")
                ? trans(res.message.id)
                : res.message.message;
        }

        return {
            status: "failed",
            data: message,
        };
    } else {
        return {
            status: "failed",
            data: trans("error.unknown"),
        };
    }
};

const signin = function* ({ payload, callback }) {
    let profile = payload;

    let signinRes = {
        status: "failed",
        data: null,
    };

    Lib.showToast({
        message: trans("signin") + "...",
        type: "loading",
    });

    try {
        const provider = _.toLower(_.get(profile, "provider", "local"));

        let providerRes = {};

        if (provider === "facebook") {
            providerRes = yield call(_signinFacebook, _.get(profile, "data"));

            const identifier =
                _.get(providerRes, "profile.id") + "@shopseeker.com";

            const password = Lib.c2c(_.get(providerRes, "profile.id"));

            profile = {
                provider,
                identifier,
                password,
            };
        } else if (provider === "google") {
            providerRes = yield call(_signinGoogle, _.get(profile, "data"));

            const identifier =
                _.get(providerRes, "profile.id") + "@shopseeker.com";

            const password = Lib.c2c(_.get(providerRes, "profile.id"));

            profile = {
                provider,
                identifier,
                password,
            };
        } else if (provider === "apple") {
            providerRes = yield call(_signinApple, _.get(profile, "data"));

            const identifier =
                _.get(providerRes, "profile.id") + "@shopseeker.com";

            const password = Lib.c2c(_.get(providerRes, "profile.id"));

            profile = {
                provider,
                identifier,
                password,
            };
        }

        signinRes = yield call(_signin, profile);

        const email = profile.identifier;
        const username = Lib.c2c(email);
        const password = profile.password;

        if (provider !== "local" && _.get(signinRes, "status") === "failed") {
            if (_.has(providerRes, "profile.avatar")) {
                const avatarUploadedEntity = yield Lib.uploadFile(
                    providerRes.profile.avatar
                );

                if (
                    !_.isEmpty(avatarUploadedEntity) &&
                    _.get(avatarUploadedEntity, "id", "") !== ""
                ) {
                    _.set(
                        providerRes,
                        "profile.avatar",
                        avatarUploadedEntity.id
                    );
                } else {
                    _.set(providerRes, "profile.avatar", null);
                }
            }

            signinRes = yield call(
                _signup,
                _.assign(
                    _.omit(profile, "identifier"),
                    {
                        email,
                        username,
                        password,
                        type: "account",
                        nickname: _.get(providerRes, "profile.nickname", ""),
                    },
                    _.pick(providerRes.profile, [
                        "first_name",
                        "last_name",
                        "gender",
                        "dob",
                        "hometown",
                        "avatar",
                    ])
                )
            );
        }

        const { status, data } = signinRes;

        if (status === "succeeded") {
            const { token, user } = data;

            const userData = {
                id: user.id,
                confirmed: user.confirmed,
                blocked: user.blocked,
                provider: user.provider,
                username: user.username,
                email: user.email,
                type: user.type || "account",
            };

            yield call(setToken, token);

            const u_type = _.toLower(userData.type);

            const QUERY =
                u_type === "merchant"
                    ? MERCHANT
                    : u_type === "deliver"
                    ? DELIVER
                    : u_type === "commission"
                    ? COMMISSION
                    : ACCOUNT;

            const { data: _data, errors } = yield call(
                handlePostRequest,
                Config.REST_HOST,
                {
                    query: QUERY,
                    variables: { id: userData.id },
                }
            );

            if (!_.isNil(errors)) {
                yield call(removeToken);

                return yield put(signinFailure({}, callback.fail));
            } else {
                yield put(initUser(userData));

                const field =
                    u_type === "merchant"
                        ? "merchants"
                        : u_type === "deliver"
                        ? "delivers"
                        : u_type === "commission"
                        ? "providers"
                        : "accounts";

                if (!_.isEmpty(_data) && !_.isEmpty(_data[field])) {
                    const init =
                        u_type === "merchant"
                            ? initMerchant
                            : u_type === "deliver"
                            ? initDeliver
                            : u_type === "commission"
                            ? initCommission
                            : initProfile;

                    yield put(init(_data[field][0]));
                }

                if (
                    provider !== "local" &&
                    !_.isEmpty(_.get(providerRes, "profile")) &&
                    !_.isEmpty(_.get(providerRes, "tokens"))
                ) {
                    yield put(updateProvider(providerRes));
                }

                return yield put(
                    signinSuccess(
                        {
                            token,
                            user: {
                                ...userData,
                                password,
                            },
                        },
                        callback.success
                    )
                );
            }
        } else {
            return yield put(
                signinFailure(
                    {
                        message: data,
                    },
                    callback.fail
                )
            );
        }
    } catch (e) {
        Log(e);

        const { message } = e.error;

        if (message === "cancelled") {
            return yield put(
                signinFailure(
                    {
                        message: trans("cancelled"),
                    },
                    callback.fail
                )
            );
        } else if (message === "denied") {
            return yield put(
                signinFailure(
                    {
                        message: trans("denied"),
                    },
                    callback.fail
                )
            );
        } else {
            return yield put(
                signinFailure(
                    {
                        message: e.message,
                    },
                    callback.fail
                )
            );
        }
    }
};

const signin_success = function* ({ payload, callback }) {
    Lib.showToast({
        message: trans("succeeded"),
        type: "success",
        onClose: callback,
    });
};

const signin_fail = function* ({ payload, callback }) {
    Lib.showToast({
        message: _.get(payload, "message", trans("failed")),
        type: "error",
        onClose: callback,
    });
};

const signout = function* ({ callback }) {
    yield put(resetProfile());

    yield put(clearCart());

    return yield put(signoutSuccess(callback.success));
};

const signout_success = function* ({ callback }) {
    Lib.showToast({
        message: trans("succeeded"),
        type: "success",
        onClose: callback,
    });
};

const login = function* ({ payload }) {
    const provider = _.toLower(payload);

    if (_.includes(["facebook", "google", "apple"], provider)) {
        window.location.href = `${window.location.origin}/connect/${provider}`;
    }
};

const root = function* () {
    yield takeLatest(AUTH.SKIP_SIGNIN, skip_signin);
    yield takeLatest(AUTH.SIGNUP_REQUEST, signup);
    yield takeLatest(AUTH.SIGNUP_SUCCESS, signup_success);
    yield takeLatest(AUTH.SIGNUP_FAILURE, signup_fail);
    yield takeLatest(AUTH.SIGNIN_REQUEST, signin);
    yield takeLatest(AUTH.SIGNIN_SUCCESS, signin_success);
    yield takeLatest(AUTH.SIGNIN_FAILURE, signin_fail);
    yield takeLatest(AUTH.SIGNOUT_REQUEST, signout);
    yield takeLatest(AUTH.SIGNOUT_SUCCESS, signout_success);
    yield takeLatest(AUTH.LOGIN_REQUEST, login);
};

export default root;
