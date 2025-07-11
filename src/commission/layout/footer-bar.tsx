import React, { FC } from "react";
import _ from "lodash";

import { FOOTER_BAR_HEIGHT } from "config/constant";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const FooterBar: FC<Props> = ({ router, changeRouter, style = [] }) => {
    const routes = [
        {
            route: "home",
            icon: (
                <Icon
                    name="home-outline"
                    size={Style.f_size_20.fontSize}
                    color={Style.f_color_dark_medium.color}
                />
            ),
            selecedIcon: (
                <Icon
                    name="home-outline"
                    size={Style.f_size_20.fontSize}
                    color={Style.f_color_first.color}
                />
            ),
            title: trans("navLinkHome"),
        },
        {
            route: "profile",
            icon: (
                <Icon
                    name="person-outline"
                    size={Style.f_size_20.fontSize}
                    color={Style.f_color_dark_medium.color}
                />
            ),
            selecedIcon: (
                <Icon
                    name="person-outline"
                    size={Style.f_size_20.fontSize}
                    color={Style.f_color_first.color}
                />
            ),
            title: trans("navlinkSetting"),
        },
    ];

    return (
        <Div
            style={[
                Style.row,
                Style.row_around,
                Style.column_center,
                Style.w_p100,
                Style.bg_color_15,
                Style.shadow_top,
                Style.fixed_bottom_horizontal,
                {
                    height: FOOTER_BAR_HEIGHT,
                },
                ...style,
            ]}
        >
            {_.map(routes, (route: any, index: number) => {
                const selected = _.isEqual(route.route, router.route);

                return (
                    <Div
                        key={index}
                        style={[
                            Style.v_center,
                            Style.position_relative,
                            Style.w_p25,
                            Style.h_p100,
                        ]}
                        onClick={() => changeRouter({ route: route.route })}
                    >
                        {selected ? route.selecedIcon : route.icon}
                        <Text style={[Style.f_size_13]}>{route.title}</Text>
                    </Div>
                );
            })}
        </Div>
    );
};

export default FooterBar;
