import fetch from "helpers/fetch";
import { encrypt } from "helpers/encrypt";

export const getPayment = (data: any) => {
    return fetch("payment", "POST", {
        ie: true,
        data: encrypt(data).toString(),
    });
};
