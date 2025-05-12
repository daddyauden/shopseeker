import React, { FC } from "react";
import _ from "lodash";

import { Card } from "interfaces/profile";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";

import Style from "style";

import RealCard from "./card";

type Props = {
    item: Card;
    value?: Card;
    onChange?: (item: any) => void;
    onDelete?: Function;
};

const PaymentCard: FC<Props> = (props) => {
    const { item, value, onChange, onDelete } = props;

    const checked =
        !_.isNil(value) &&
        _.has(value, "id") &&
        _.isEqual(_.get(item, "id"), _.get(value, "id"));

    return (
        <Div
            style={[
                Style.v_center,
                Style.w_p100,
                Style.h_p100,
                Style.position_relative,
                Style.cursor_pointer,
                Style.bg_color_light,
            ]}
            onClick={!_.isNil(onChange) ? () => onChange!(item) : undefined}
        >
            {checked && (
                <Div
                    style={[
                        Style.column_center,
                        Style.top_horizontal,
                        {
                            left: "50%",
                            top: "5px",
                            marginLeft: "-15px",
                        },
                    ]}
                >
                    <Icon
                        name="checkmark-circle"
                        size={Style.f_size_20.fontSize}
                        color={Style.f_color_success.color}
                    />
                </Div>
            )}

            {onDelete && (
                <Div
                    style={[
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.top_right,
                        {
                            top: "20px",
                            right: "25px",
                        },
                    ]}
                >
                    <A onPress={onDelete}>
                        <Icon
                            name="trash-outline"
                            size={Style.f_size_20.fontSize}
                            color={Style.f_color_dark.color}
                        />
                    </A>
                </Div>
            )}

            <RealCard {...item} />
        </Div>
    );
};

export default PaymentCard;
