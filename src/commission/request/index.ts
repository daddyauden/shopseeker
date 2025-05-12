import fetch from "helpers/fetch";
import { encrypt } from "helpers/encrypt";

export const createProvider = (data: object) => {
    return fetch("newprovider", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

// identity
export const getIdentify = (data: object) => {
    return fetch("provider/identity", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const updateIdentity = (data: object) => {
    return fetch("provider/identity", "PUT", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

// external account
export const getExternalAccount = (data: object) => {
    return fetch("provider/external/fetch", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const addExternalAccount = (data: object) => {
    return fetch("provider/external", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const updateExternalAccount = (data: object) => {
    return fetch("provider/external", "PUT", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const removeExternalAccount = (data: object) => {
    return fetch("provider/external/remove", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const getBankAccountStatus = (data: object) => {
    return fetch("provider/status", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const getBankAccountBalance = (data: object) => {
    return fetch("provider/balance", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const getServicedMerchants = (data: object) => {
    return fetch("commission/merchants", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};
