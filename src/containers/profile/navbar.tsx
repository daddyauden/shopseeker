import React, { FC } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { IS_MOBILE, HEADER_BAR_HEIGHT } from "config/constant";

import { signout as signoutAction } from "actions/auth";

import { goToApp, goToShop } from "utils/navigation";

import A from "components/a";
import Div from "components/div";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ProfileNavbar: FC<Props> = (props) => {
    const { signout, currentNav, changeNav, merchant } = props;

    const navs = [
        {
            name: "profile",
            title: "navlinkProfile",
        },
        {
            name: "order",
            title: "navlinkOrder",
        },
    ];

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            if (merchant && _.has(merchant, "id")) {
                signout({
                    success: () => goToShop(merchant.id),
                });
            } else {
                signout({
                    success: () => goToApp(),
                });
            }
        }
    };

    return (
        <Div
            style={[
                Style.row,
                Style.row_start,
                Style.column_center,
                Style.w_p100,
                Style.bg_color_light,
                Style.shadow_bottom,
                Style.p_h_2,
                IS_MOBILE ? Style.fixed_top_horizontal : Style.top_horizontal,
                {
                    zIndex: 999,
                    top: 0,
                    height: HEADER_BAR_HEIGHT,
                },
                ...props.style,
            ]}
        >
            {_.map(navs, (nav: any, index: number) => {
                const actived = currentNav === nav.name;

                return (
                    <A
                        key={index}
                        style={[
                            Style.v_center,
                            Style.p_h_3,
                            Style.border_round_1,
                            {
                                height: HEADER_BAR_HEIGHT - 20,
                            },
                        ]}
                        onPress={() => changeNav(nav.name)}
                    >
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_weight_500,
                                actived && Style.f_color_primary,
                            ]}
                        >
                            {trans(nav.title)}
                        </Text>
                    </A>
                );
            })}
            <A
                onPress={() => handleLogout()}
                style={[
                    Style.v_center,
                    Style.p_h_3,
                    Style.border_round_1,
                    {
                        height: HEADER_BAR_HEIGHT - 20,
                    },
                ]}
            >
                <Text style={[Style.f_size_15, Style.f_weight_500]}>
                    {trans("navlinkLogout")}
                </Text>
            </A>
        </Div>
    );
};

ProfileNavbar.defaultProps = {
    style: [],
};

const mapDispatchToProps = (dispatch) => {
    return {
        signout: (callback: any) => dispatch(signoutAction(callback)),
    };
};

export default connect(null, mapDispatchToProps)(ProfileNavbar);
