import React, { useState } from "react";
import _ from "lodash";

import Div from "components/div";

import NavBar from "deliver/layout/nav-bar";

import Waiting from "./waiting";
import Received from "./received";
import InDelivery from "./in-delivery";
import Delivered from "./delivered";

import Style from "style";

const Delivery = (props) => {
    const { sub_tab } = props;

    const progresses = ["waiting", "received", "in-delivery", "delivered"];

    const _progress = _.includes(progresses, sub_tab) ? sub_tab : "waiting";

    const [progress, changeProgress] = useState(_progress);

    let component: any = null;

    switch (progress) {
        case "waiting":
            component = <Waiting {...props} />;
            break;

        case "received":
            component = <Received />;
            break;

        case "in-delivery":
            component = <InDelivery />;
            break;

        case "delivered":
            component = <Delivered />;
            break;
    }

    return (
        <Div
            style={[
                Style.column,
                Style.position_relative,
                Style.h_p100,
                Style.bg_color_15,
            ]}
        >
            <NavBar
                currentNav={progress}
                changeNav={(progress: string) => changeProgress(progress)}
            />
            {component}
        </Div>
    );
};

export default Delivery;
