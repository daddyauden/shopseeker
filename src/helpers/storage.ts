import Log from "helpers/log";
import storage from "redux-persist/lib/storage";

import { encrypt, decrypt } from "./encrypt";

export const getLocalState = async (key: string) => {
    try {
        const serializedState: any = await storage.getItem(key);

        if (!serializedState) {
            return null;
        }

        return decrypt(serializedState);
    } catch (error) {
        Log(error);
        return null;
    }
};

export const setLocalState = async (
    key: string,
    value: object | string | null
) => {
    try {
        await storage.setItem(key, encrypt(value));
    } catch (error) {
        Log(error);
    }
};

export const removeLocalState = async (key: string) => {
    try {
        await storage.removeItem(key);
    } catch (error) {
        Log(error);
    }
};

export default {
    getItem: (key: string): Promise<string> => {
        return new Promise((resolve) => {
            resolve(getLocalState(key));
        });
    },
    setItem: (key: string, item: string): Promise<void> => {
        return new Promise((resolve) => {
            resolve(setLocalState(key, item));
        });
    },
    removeItem: (key: string): Promise<void> => {
        return new Promise((resolve) => {
            resolve(removeLocalState(key));
        });
    },
};
