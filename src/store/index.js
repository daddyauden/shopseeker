import _ from "lodash";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import storage from "helpers/storage";

import Reducers from "reducers";
import Sagas from "sagas";

let store = null;

const configureStore = () => {
    if (store) {
        return store;
    }

    const __DEV__ = process.env.NODE_ENV === "development";

    const sagaMiddleware = createSagaMiddleware();
    let middlewares = [sagaMiddleware];
    let enhancers;

    if (__DEV__ && typeof window === "object") {
        const _compose =
            typeof window === "object" ? composeWithDevTools : compose;

        const reduxImmutableStateInvariant =
            require("redux-immutable-state-invariant").default();

        middlewares.push(reduxImmutableStateInvariant);

        enhancers = _compose(applyMiddleware(...middlewares));
    } else {
        enhancers = compose(applyMiddleware(...middlewares));
    }

    const reducers = persistReducer(
        {
            key: "_WEBAPP",
            keyPrefix: "MH",
            storage,
            debug: __DEV__,
        },
        Reducers
    );

    store = createStore(reducers, enhancers);

    store.__persistor = persistStore(store);

    sagaMiddleware.run(Sagas);

    return store;
};

export default configureStore;
