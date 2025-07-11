import React, { FC } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { Router } from "interfaces/router";

import { IS_MOBILE, FOOTER_BAR_HEIGHT } from "config/constant";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import Style from "style";

type Props = {
    router: Router;
    changeRouter: (router: Router) => void;
    [key: string]: any;
};

const FooterBar: FC<Props> = (props) => {
    const { router, changeRouter, items, style = [] } = props;

    const itemsSize = _.size(items);

    const routes = [
        {
            route: "home",
            icon: (
                <Icon
                    name="store-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_dark_bold.color}
                />
            ),
            selecedIcon: (
                <Icon
                    name="store-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_first.color}
                />
            ),
        },
        {
            route: "explore",
            icon: (
                <Icon
                    name="search-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_dark_bold.color}
                />
            ),
            selecedIcon: (
                <Icon
                    name="search-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_first.color}
                />
            ),
        },
        {
            route: "cart",
            icon: (
                <>
                    <Icon
                        name="cart-outline"
                        size={Style.f_size_30.fontSize}
                        color={Style.f_color_dark_bold.color}
                    />
                    {itemsSize > 0 && (
                        <Div
                            style={[
                                Style.top_horizontal,
                                Style.v_center,
                                Style.h_p50,
                                {
                                    left: "4px",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    Style.f_color_first,
                                    Style.f_size_12,
                                    Style.f_weight_500,
                                ]}
                            >
                                {itemsSize}
                            </Text>
                        </Div>
                    )}
                </>
            ),
            selecedIcon: (
                <>
                    <Icon
                        name="cart-outline"
                        size={Style.f_size_30.fontSize}
                        color={Style.f_color_dark_bold.color}
                    />
                    {itemsSize > 0 && (
                        <Div
                            style={[
                                Style.top_horizontal,
                                Style.v_center,
                                Style.h_p50,
                                {
                                    left: "4px",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    Style.f_color_first,
                                    Style.f_size_12,
                                    Style.f_weight_500,
                                ]}
                            >
                                {itemsSize}
                            </Text>
                        </Div>
                    )}
                </>
            ),
        },
        {
            route: "profile",
            icon: (
                <Icon
                    name="person-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_dark_bold.color}
                />
            ),
            selecedIcon: (
                <Icon
                    name="person-outline"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_first.color}
                />
            ),
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
                IS_MOBILE
                    ? Style.fixed_bottom_horizontal
                    : Style.bottom_horizontal,
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
                    </Div>
                );
            })}
        </Div>
    );
};

const mapStateToProps = (state) => {
    return {
        items: state.cart.items,
    };
};

export default connect(mapStateToProps)(FooterBar);
