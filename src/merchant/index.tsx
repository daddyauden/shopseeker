import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Tabs } from "antd";

const { TabPane } = Tabs;

import { FOOTER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

import Div from "components/div";
import NoResultFound from "components/no-result";

import { useMerchant } from "merchant/contexts/app";
import { DrawerProvider } from "merchant/contexts/drawer";

import Drawer from "merchant/containers/drawer";
import FooterBar from "merchant/layout/footer-bar";

import Home from "merchant/containers/home";
import Order from "merchant/containers/order";
import Category from "merchant/containers/category";
import Profile from "merchant/containers/profile";
import Product from "merchant/containers/product";
import Init from "merchant/containers/profile/init";

import { trans } from "locales";

import Style from "style";

const MerchantRoutes = (props) => {
    const {
        config: { device, query },
        merchant,
    } = useMerchant();

    if (!_.isEmpty(merchant) && _.get(merchant, "id", "") === "") {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    if (_.isEmpty(merchant) || !_.get(merchant, "entity", "")) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Div
                    style={[
                        Style.column,
                        Style.row_center,
                        device.isMobile
                            ? { width: "100%", height: "100%" }
                            : { width: "390pt", height: "570pt" },
                        Style.position_relative,
                        Style.overflow_y_auto,
                    ]}
                >
                    <Init />
                </Div>
            </Div>
        );
    }

    const progresses = ["home", "order", "product", "profile"];

    const tabs = ["home", "order", "product", "profile"];

    const progress = _.toLower(_.get(query, "tab", "home"));

    const route = _.includes(progresses, progress) ? progress : "home";

    const [router, changeRouter] = useState<Router>({ route });

    let component = <></>;

    switch (router.route) {
        case "home":
            component = (
                <Home
                    {...props}
                    {...query}
                    device={device}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "order":
            component = (
                <Order
                    {...query}
                    device={device}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;

        case "product":
            component = (
                <Tabs
                    defaultActiveKey="1"
                    centered
                    className="ant-tabs-top-fixed"
                >
                    <TabPane
                        tab={trans("navlinkProduct")}
                        key="1"
                        style={{
                            ...Style.f_size_13,
                            ...Style.f_color_dark_medium,
                            ...Style.f_weight_500,
                        }}
                    >
                        <Product
                            {...query}
                            device={device}
                            router={router}
                            changeRouter={changeRouter}
                        />
                    </TabPane>
                    <TabPane
                        tab={trans("navlinkCategory")}
                        key="2"
                        style={{
                            ...Style.f_size_13,
                            ...Style.f_color_dark_medium,
                            ...Style.f_weight_500,
                        }}
                    >
                        <Category
                            {...query}
                            device={device}
                            router={router}
                            changeRouter={changeRouter}
                        />
                    </TabPane>
                </Tabs>
            );
            break;

        case "profile":
            component = (
                <Profile
                    {...query}
                    device={device}
                    router={router}
                    changeRouter={changeRouter}
                />
            );
            break;
    }

    return (
        <DrawerProvider>
            <Div
                style={[
                    Style.column,
                    Style.position_relative,
                    Style.overflow_hidden,
                    Style.w_p100,
                    Style.h_p100,
                    Style.bg_color_15,
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
                            router={router}
                            changeRouter={changeRouter}
                        />
                    )}
                </Div>
            </Div>
            <Drawer />
        </DrawerProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
    };
};

export default connect(mapStateToProps)(MerchantRoutes);
