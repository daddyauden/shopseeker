import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { HEADER_BAR_HEIGHT, FOOTER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

import Div from "components/div";
import NoResultFound from "components/no-result";

import { useDeliver } from "deliver/contexts/app";
import { DrawerProvider } from "deliver/contexts/drawer";

import Drawer from "deliver/containers/drawer";
import FooterBar from "deliver/layout/footer-bar";

import Home from "deliver/containers/home";
import Profile from "deliver/containers/profile";
import Delivery from "deliver/containers/delivery";
import Init from "deliver/containers/profile/init";

import Style from "style";

const DeliverRoutes = () => {
    const {
        config: { device, query },
        deliver,
    } = useDeliver();

    if (!_.isEmpty(deliver) && _.get(deliver, "id", "") === "") {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    if (_.isEmpty(deliver) || !_.get(deliver, "entity", "")) {
        return (
            <Div style={[Style.v_center, Style.w_p100, Style.h_p100]}>
                <Init />
            </Div>
        );
    }

    const progresses = ["home", "delivery", "profile"];

    const tabs = ["home", "delivery", "profile"];

    const progress = _.toLower(_.get(query, "tab", "home"));

    const route = _.includes(progresses, progress) ? progress : "home";

    const [router, changeRouter] = useState<Router>({ route });

    let component = <></>;

    switch (router.route) {
        case "home":
            component = <Home deliver={deliver} />;
            break;

        case "delivery":
            component = (
                <Div
                    style={[
                        {
                            height: `calc(100% - ${HEADER_BAR_HEIGHT}px)`,
                            marginTop: HEADER_BAR_HEIGHT,
                        },
                    ]}
                >
                    <Delivery
                        {...query}
                        deliver={deliver}
                        device={device}
                        router={router}
                        changeRouter={changeRouter}
                    />
                </Div>
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
            <Div style={[Style.v_center, Style.h_p100]}>
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

export default connect(mapStateToProps)(DeliverRoutes);
