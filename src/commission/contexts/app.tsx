import React, { useState, useContext, createContext } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

import { signout as signoutAction } from "actions/auth";

type AppProps = {
    config: any;
    getConfig: any;
    useDispatch: any;
    commission: any;
    signout: any;
};

export const CommissionContext = createContext({} as AppProps);

export const CommissionProvider = (props) => {
    const commission = useSelector((state) => state["profile"]["commission"]);

    const needs = _.omit(props, ["children", "states", "dispatch"]);

    const [config] = useState({
        ...needs,
        ...props.states,
    });

    const getConfig = (property: string): any => {
        return _.get(config, property, null);
    };

    const useDispatch = (action: any): any => {
        return props.dispatch(action);
    };

    const signout = (callback = null) => {
        useDispatch(signoutAction(callback));
    };

    return (
        <CommissionContext.Provider
            value={{
                config,
                getConfig,
                useDispatch,
                commission,
                signout,
            }}
        >
            {props.children}
        </CommissionContext.Provider>
    );
};

export const useCommission = () => {
    return useContext(CommissionContext);
};
