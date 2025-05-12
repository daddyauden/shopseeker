import React, { FC, useState } from "react";
import _ from "lodash";
import Head from "next/head";

import { FOOTER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

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

type Props = {
    [key: string]: any;
};

const ShopIndexPage: FC<Props> = (props) => {
    const { device, query, shop } = props;

    const checkoutMode = "full";

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

    const { xl, lg, md, sm, xs, isMobile, isDesktop } = device;

    let VIEW_WIDTH = "100%";
    let VIEW_HEIGHT = "100%";

    if (xl) {
        VIEW_WIDTH = "750px";
        VIEW_HEIGHT = "1080px";
    } else if (lg) {
        VIEW_WIDTH = "600px";
        VIEW_HEIGHT = "960px";
    } else if (md) {
        VIEW_WIDTH = "450px";
        VIEW_HEIGHT = "840px";
    } else if (sm) {
        VIEW_WIDTH = "450px";
        VIEW_HEIGHT = "720px";
    } else if (xs) {
        VIEW_WIDTH = "300px";
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
                {checkoutMode === "full" && (
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
                )}
            </Div>
        </Div>
    );
};

export default ShopIndexPage;
