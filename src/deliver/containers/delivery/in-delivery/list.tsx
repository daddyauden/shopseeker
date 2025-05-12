import React, { FC, useState } from "react";
import _ from "lodash";

import Div from "components/div";

import DeliveryItem from "./item";

import Style from "style";

type Props = {
    [key: string]: any;
};

const InDeliveryList: FC<Props> = (props) => {
    const { deliver, deliveries, onClick } = props;

    const [list, setList] = useState(deliveries);

    const callback = (data) => {
        if (!_.isEmpty(data)) {
            const { type, payload } = data;
            if (type === "remove") {
                setList(
                    _.filter(
                        list,
                        (delivery) => delivery.id !== payload.delivery
                    )
                );
            }
        }
    };

    return (
        <Div style={[Style.column, Style.p_h_3]}>
            {_.map(list, (delivery: any, index: number) => (
                <DeliveryItem
                    key={index}
                    deliver={deliver}
                    delivery={delivery}
                    onClick={onClick}
                    callback={callback}
                />
            ))}
        </Div>
    );
};

export default InDeliveryList;
