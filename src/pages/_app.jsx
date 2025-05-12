import React from "react";
import _ from "lodash";
import Head from "next/head";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";

import { IS_DESKTOP, IS_MOBILE, IS_TABLET } from "config/constant";

import configureStore from "store";
import Locales from "locales";

import { updateState } from "actions/mode";

import { useMedia } from "utils/use-media";
import { useWindowSize } from "utils/use-window-size";

import Log from "helpers/log";
import { createApolloClient } from "helpers/apollo";

import Customer from "customer";
import { CustomerProvider } from "customer/contexts/app";

import Merchant from "merchant";
import { MerchantProvider } from "merchant/contexts/app";

import Deliver from "deliver";
import { DeliverProvider } from "deliver/contexts/app";

import Commission from "commission";
import { CommissionProvider } from "commission/contexts/app";

import "swiper/swiper-bundle.css";
import "rc-drawer/assets/index.css";
import "antd/dist/antd.css";
import "assets/css/iconfont.css";
import "assets/css/common.css";

const Root = (props) => {
    if (typeof window === "undefined") {
        return null;
    }

    const {
        Component,
        pageProps,
        apolloCache,
        apolloClient = createApolloClient(apolloCache),
        query,
        pathname,
        ua,
        ip,
    } = props;

    const { width, height } = useWindowSize();

    const ts = useMedia("(max-width: 319.98px)");
    const xs = useMedia("(min-width: 320px) and (max-width: 575.98px)");
    const sm = useMedia("(min-width: 576px) and (max-width: 767.98px)");
    const md = useMedia("(min-width: 768px) and (max-width: 991.98px)");
    const lg = useMedia("(min-width: 992px) and (max-width: 1199.98px)");
    const xl = useMedia("(min-width: 1200px)");

    const is_large_screen = width >= 1024;
    const is_landscape = width > height;

    const device = {
        ts,
        xs,
        sm,
        md,
        lg,
        xl,
        isMobile: IS_MOBILE,
        isTablet: IS_TABLET,
        isDesktop: IS_DESKTOP,
        is_large_screen,
        is_landscape,
    };

    const routeProps = {
        query,
        pathname,
        ua,
        ip,
        device,
        ...pageProps,
    };

    let render = <></>;

    const store = configureStore();

    const { dispatch, getState } = store;

    dispatch(updateState("", { ua, ip }));

    const states = getState();

    const { user, account, merchant, deliver, commission } = states.profile;

    const isLoggedIn = _.get(user, "id", "") !== "";
    const isAccount = isLoggedIn && _.get(user, "type") === "account";
    const isMerchant = isLoggedIn && _.get(user, "type") === "merchant";
    const isDeliver = isLoggedIn && _.get(user, "type") === "deliver";
    const isCommission = isLoggedIn && _.get(user, "type") === "commission";

    if (isMerchant) {
        if (_.has(window, "ReactNativeWebView")) {
            window.ReactNativeWebView.postMessage(merchant.id);
        }
    }

    if (isDeliver) {
        if (_.has(window, "ReactNativeWebView")) {
            window.ReactNativeWebView.postMessage(deliver.id);
        }
    }

    if (isCommission) {
        if (_.has(window, "ReactNativeWebView")) {
            window.ReactNativeWebView.postMessage(commission.id);
        }
    }

    const whoami = {
        isLoggedIn,
        isAccount,
        isMerchant,
        isDeliver,
        isCommission,
        user,
        account,
        deliver,
        merchant,
        commission,
    };

    const fullState = _.assign(
        whoami,
        {
            dispatch,
            states,
            width,
            height,
        },
        routeProps
    );

    if (isMerchant) {
        render = (
            <MerchantProvider {...fullState}>
                <Merchant />
            </MerchantProvider>
        );
    } else if (isDeliver) {
        render = (
            <DeliverProvider {...fullState}>
                <Deliver />
            </DeliverProvider>
        );
    } else if (isCommission) {
        render = (
            <CommissionProvider {...fullState}>
                <Commission />
            </CommissionProvider>
        );
    } else {
        render = (
            <CustomerProvider {...fullState}>
                <Customer>
                    <Component {...fullState} />
                </Customer>
            </CustomerProvider>
        );
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={store.__persistor}>
                <ApolloProvider client={apolloClient}>
                    <ConfigProvider>
                        <I18nextProvider i18n={Locales}>
                            <Head>
                                <meta
                                    name="viewport"
                                    content="width=device-width, initial-scale=1"
                                />
                            </Head>
                            {render}
                        </I18nextProvider>
                    </ConfigProvider>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
};

Root.getInitialProps = async (context) => {
    const {
        ctx: { req, query, asPath },
        Component,
    } = context;

    let props = {
        pageProps: Component.getInitialProps
            ? await Component.getInitialProps(context)
            : {},
    };

    if (req) {
        const apolloClient = createApolloClient();

        try {
            const { getDataFromTree } = await import(
                "@apollo/client/react/ssr"
            );

            await getDataFromTree(
                <Root
                    {...props}
                    Component={Component}
                    apolloClient={apolloClient}
                    query={query || {}}
                    pathname={asPath || ""}
                />
            );
        } catch (error) {
            Log(error);
        }

        props.apolloCache = apolloClient.cache.extract();
    }

    props.query = query || {};
    props.pathname = asPath || "";

    return props;
};

export default Root;
