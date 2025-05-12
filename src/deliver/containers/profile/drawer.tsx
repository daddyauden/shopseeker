import React from "react";
import _ from "lodash";
import Router from "next/router";

import { DELIVER_SIGNIN_PAGE } from "config/route";

import { useDeliver } from "deliver/contexts/app";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import LanguageRegion from "components/language-region";

import { trans } from "locales";

import Style from "style";

const ProfileDrawer = () => {
    const { signout } = useDeliver();

    return (
        <Div
            style={[
                Style.column,
                Style.row_between,
                Style.h_p100,
                Style.bg_color_15,
                Style.p_4,
            ]}
        >
            <LanguageRegion />
            <Div style={[Style.column, Style.row_center]}>
                <A onPress={() => signout(Router.push(DELIVER_SIGNIN_PAGE))}>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_dark,
                            Style.f_weight_500,
                        ]}
                    >
                        {trans("navlinkLogout")}
                    </Text>
                </A>

                <A>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_dark,
                            Style.f_weight_500,
                            Style.m_t_2,
                        ]}
                    >
                        {trans("terms_of_use")}
                    </Text>
                </A>
                <A>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_dark,
                            Style.f_weight_500,
                            Style.m_t_2,
                        ]}
                    >
                        {trans("privacy_policy")}
                    </Text>
                </A>

                <Div style={[Style.row, Style.column_center, Style.m_t_2]}>
                    <Icon
                        name="copyright"
                        style={[Style.f_color_11]}
                        color={Style.f_color_dark.color}
                    />
                    <Text
                        style={[
                            Style.m_l_1,
                            Style.f_size_12,
                            Style.f_color_dark_light,
                            Style.f_weight_500,
                        ]}
                    >
                        MarchéHub Inc.
                    </Text>
                </Div>
            </Div>
        </Div>
    );
};

export default ProfileDrawer;
