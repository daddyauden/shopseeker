import React, { FC, useState } from "react";
import _ from "lodash";
import Head from "next/head";
import { connect } from "react-redux";

import { FOOTER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

import { getMerchant } from "merchant/request";

import Div from "components/div";
import NoResultFound from "components/no-result";

import FooterBar from "containers/bar/footer-bar";

import HomePage from "containers/shop/home";
import CartPage from "containers/shop/cart";
import SearchPage from "containers/shop/search";
import ExplorePage from "containers/shop/explore";
import ProfilePage from "containers/shop/profile";
import PaymentPage from "containers/shop/payment";

import Style from "style";

import { SHOP_DETAIL } from "graphql/query";

type Props = {
    [key: string]: any;
};

const ShopPage: FC<Props> = (props) => {
    const { device, query, shop } = props;

    const progresses = [
        "home",
        "explore",
        "cart",
        "profile",
        "search",
        "payment",
    ];

    const tabs = ["home", "explore", "cart", "profile", "search"];

    if (_.get(shop, "id", "") === "") {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    const progress = _.toLower(_.get(query, "tab", "home"));

    const route = _.includes(progresses, progress) ? progress : "home";

    const [router, changeRouter] = useState<Router>({ route });

    let component = <></>;

    switch (router.route) {
        case "home":
            component = (
                <HomePage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "explore":
            component = (
                <ExplorePage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "cart":
            component = (
                <CartPage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "profile":
            component = (
                <ProfilePage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "search":
            component = (
                <SearchPage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "payment":
            component = (
                <PaymentPage
                    {...props}
                    {...query}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;
    }

    const { xl, lg, md, sm, isMobile, isDesktop } = device;

    let VIEW_WIDTH = "100%";
    let VIEW_HEIGHT = "100%";
    if (xl) {
        VIEW_WIDTH = "720px";
        VIEW_HEIGHT = "1080px";
    } else if (lg) {
        VIEW_WIDTH = "640px";
        VIEW_HEIGHT = "960px";
    } else if (md) {
        VIEW_WIDTH = "560px";
        VIEW_HEIGHT = "840px";
    } else if (sm) {
        VIEW_WIDTH = "480px";
        VIEW_HEIGHT = "720px";
    }

    return (
        <Div style={[Style.v_center, Style.h_p100]}>
            <Head>
                <title>{shop.name}</title>
            </Head>
            <Div
                style={[
                    Style.column,
                    Style.position_relative,
                    Style.overflow_hidden,
                    isMobile
                        ? { width: "100%", height: "100%" }
                        : { width: VIEW_WIDTH, height: VIEW_HEIGHT },
                    isDesktop && Style.b_light_dark,
                    isDesktop && Style.border_round_2,
                ]}
            >
                <Div
                    style={[
                        { height: `calc(100% - ${FOOTER_BAR_HEIGHT}px)` },
                        Style.overflow_y_auto,
                    ]}
                >
                    {component}
                </Div>
                <Div>
                    {_.includes(tabs, router.route) && (
                        <FooterBar
                            {...props}
                            {...query}
                            router={router}
                            changeRouter={changeRouter}
                        />
                    )}
                </Div>
            </Div>
        </Div>
    );
};

export const getServerSideProps = async ({ query }) => {
    const id = _.get(query, "id", "");
    let shop = {};

    if (id !== "") {
        const { data, errors } = await getMerchant({
            query: SHOP_DETAIL,
            variables: { id },
        });

        if (_.isNil(errors) && !_.isEmpty(_.get(data, "merchant", {}))) {
            shop = _.get(data, "merchant");
        }
    }

    return {
        props: {
            shop,
        },
    };
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
    };
};

export default connect(mapStateToProps)(ShopPage);
