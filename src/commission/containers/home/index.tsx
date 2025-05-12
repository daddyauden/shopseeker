import React, { useState } from "react";
import _ from "lodash";

import Div from "components/div";
import LanguageSwitcher from "components/language-switcher";

import Merchants from "commission/containers/merchant";
import Commissions from "commission/containers/commission";

import Style from "style";

const HomePage = (props) => {
    const { commission } = props;

    const progresses = ["merchants", "commissions"];

    const { sub_tab: tab } = props;

    const _progress = _.includes(progresses, tab) ? tab : "merchants";

    const [route, changeRoute] = useState({
        name: _progress,
        data: {},
    });

    const renderView = () => {
        let component = <></>;

        switch (route.name) {
            case "merchants":
                component = (
                    <Merchants
                        commission={commission}
                        changeRoute={(name: string, data: any = {}) =>
                            changeRoute({ name, data })
                        }
                    />
                );
                break;

            case "commissions":
                component = (
                    <Commissions
                        {...route.data}
                        commission={commission}
                        changeRoute={(name: string, data: any = {}) =>
                            changeRoute({ name, data })
                        }
                    />
                );
                break;
        }

        return component;
    };

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
            {renderView()}
        </Div>
    );
};

export default HomePage;
