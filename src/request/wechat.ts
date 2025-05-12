import fetch from "helpers/fetch";
import { encrypt } from "helpers/encrypt";

export const getAccessToken = () => {
    return fetch("offi/access_token");
};

export const getJsapiTicket = (data: object) => {
    return fetch("offi/jsapi_ticket", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};

export const configSignature = (data) => {
    return fetch("offi/signature", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};
