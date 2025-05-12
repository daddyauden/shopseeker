import { getLocalState, setLocalState, removeLocalState } from "./storage";

import { LOCALE_KEY } from "config/constant";

export const getLocalLocale = async () => {
    return await getLocalState(LOCALE_KEY);
};

export const setLocalLocale = async (locale: string) => {
    await setLocalState(LOCALE_KEY, locale);
};

export const removeLocalLocale = async () => {
    await removeLocalState(LOCALE_KEY);
};
