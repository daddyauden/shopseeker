import React from "react";
import _ from "lodash";

import { HEADER_BAR_HEIGHT } from "config/constant";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import HeaderBar from "merchant/layout/header-bar";

import SalesSummary from "merchant/widgets/sales/summary";
import BankStatusWidget from "merchant/widgets/bank/status";
import BankBalanceWidget from "merchant/widgets/bank/balance";

import { trans } from "locales";

import Style from "style";

const StatisticsPage = (props) => {
    return (
        <Div
            style={[
                Style.column,
                Style.h_p100,
                Style.bg_color_15,
                Style.overflow_y_auto,
                {
                    paddingTop: HEADER_BAR_HEIGHT + 10,
                },
            ]}
        >
            <HeaderBar
                headerLeft={
                    <A
                        style={[Style.h_center]}
                        onPress={() => props.changeNav("home")}
                    >
                        <Icon
                            name="chevron-back"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark_medium,
                                Style.f_weight_500,
                                Style.m_l_1,
                            ]}
                        >
                            {trans("back")}
                        </Text>
                    </A>
                }
                style={{
                    ...Style.bg_color_15,
                    ...Style.shadow_all,
                    ...Style.w_p100,
                    top: 0,
                }}
            />

            <BankStatusWidget {...props} />
            <Div style={[Style.bg_color_light_dark, Style.m_v_2]}></Div>
            <BankBalanceWidget {...props} />
            <Div style={[Style.bg_color_light_dark, Style.m_v_2]}></Div>
            <SalesSummary {...props} />
        </Div>
    );
};

export default StatisticsPage;
