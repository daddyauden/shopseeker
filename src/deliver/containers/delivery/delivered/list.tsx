import React, { FC } from "react";
import _ from "lodash";

import Div from "components/div";

import DeliveryItem from "./item";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ReceivedList: FC<Props> = (props) => {
    const { deliveries, onClick } = props;

    return (
        <Div style={[Style.column, Style.p_h_3]}>
            {_.map(deliveries, (delivery: any, index: number) => (
                <DeliveryItem
                    key={index}
                    delivery={delivery}
                    onClick={onClick}
                />
            ))}
        </Div>
    );
};

export default ReceivedList;
