import React from "react";
import _ from "lodash";

import Div from "components/div";
import LanguageSwitcher from "components/language-switcher";

import BankStatusWidget from "deliver/widgets/bank/status";
import BankBalanceWidget from "deliver/widgets/bank/balance";
import DeliverySummary from "deliver/widgets/delivery/summary";

import Style from "style";

const HomePage = (props) => {
    return (
        <Div style={[Style.column, Style.h_p100]}>
            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.row_end,
                    Style.top_right,
                    {
                        top: "20px",
                        right: "15px",
                    },
                ]}
            >
                <LanguageSwitcher />
            </Div>

            <BankStatusWidget {...props} />
            <Div style={[Style.bg_color_light_dark, Style.m_v_2]}></Div>
            <BankBalanceWidget {...props} />
            <Div style={[Style.bg_color_light_dark, Style.m_v_2]}></Div>
            <DeliverySummary {...props} />
        </Div>
    );
};

export default HomePage;
