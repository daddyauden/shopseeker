import React from "react";

import Div from "components/div";
import LanguageSwitcher from "components/language-switcher";

import { useMerchant } from "merchant/contexts/app";

import ReadyToCollectOrder from "merchant/widgets/order/ready_to_collect";

import Style from "style";

const Home = () => {
    const { merchant } = useMerchant();

    return (
        <>
            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.row_end,
                    Style.top_right,
                    {
                        top: "30px",
                        right: "15px",
                        zIndex: 5,
                    },
                ]}
            >
                <LanguageSwitcher />
            </Div>

            <ReadyToCollectOrder merchant={merchant} />
        </>
    );
};

export default Home;
