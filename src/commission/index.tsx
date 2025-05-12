import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { FOOTER_BAR_HEIGHT } from "config/constant";

import { Router } from "interfaces/router";

import Div from "components/div";
import NoResultFound from "components/no-result";

import { useCommission } from "commission/contexts/app";
import { DrawerProvider } from "commission/contexts/drawer";

import Drawer from "commission/containers/drawer";
import FooterBar from "commission/layout/footer-bar";

import Home from "commission/containers/home";
import Profile from "commission/containers/profile";
import Init from "commission/containers/profile/init";

import Style from "style";

const CommissionRoutes = () => {
    const {
        config: { device, query },
        commission,
    } = useCommission();

    if (!_.isEmpty(commission) && _.get(commission, "id", "") === "") {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    if (_.isEmpty(commission) || !_.get(commission, "entity", "")) {
        return (
            <Div style={[Style.v_center, Style.w_p100, Style.h_p100]}>
                <Init />
            </Div>
        );
    }

    const progresses = ["home", "profile"];

    const tabs = ["home", "profile"];

    const progress = _.toLower(_.get(query, "tab", "home"));

    const route = _.includes(progresses, progress) ? progress : "home";

    const [router, changeRouter] = useState<Router>({ route });

    let component = <></>;

    switch (router.route) {
        case "home":
            component = <Home commission={commission} />;
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

export default connect(mapStateToProps)(CommissionRoutes);
