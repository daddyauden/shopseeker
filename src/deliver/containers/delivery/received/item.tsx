import React, { FC, useState } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { message } from "antd";
import Currency from "currency.js";

import CurrencyModel from "model/currency";

import { updateDeliveryStatus } from "deliver/request";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ReceivedItem: FC<Props> = (props) => {
    const { deliver, delivery, onClick, callback } = props;

    const [disabled, setDisabled] = useState(false);

    const currency = _.toLower(_.get(delivery, "currency"));
    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);
    const receivedTime = dayjs(_.get(delivery, "receivedTime")).format(
        "YYYY-MM-DD HH:mm"
    );

    const op = (data) => {
        message
            .loading("", 0.5)
            .then(() => {
                setDisabled(true);
                return updateDeliveryStatus(data);
            })
            .then((res) => {
                const { status } = res;

                if (status === "succeeded") {
                    message.success(trans("succeeded"), 1, () => {
                        callback({
                            type: "remove",
                            payload: _.pick(data, "delivery"),
                        });
                    });
                } else if (status === "failed") {
                    message.warning(
                        trans(
                            _.get(res, "data") ? _.get(res, "data") : "failed"
                        ),
                        3
                    );
                }

                setDisabled(false);
            });
    };

    return (
        <Div
            style={[
                Style.column,
                Style.row_center,
                Style.bg_color_15,
                Style.p_v_2,
                Style.b_t_light_medium,
                {
                    transition: "height 0.3s ease",
                },
            ]}
            onClick={() => onClick(delivery)}
        >
            <Div style={[Style.row, Style.row_between, Style.column_center]}>
                <Text
                    style={[Style.f_size_13, Style.f_weight_500]}
                >{`#${Lib.chunkStr(delivery.serial, 4)}`}</Text>
                <Text style={[Style.f_size_13]}>{receivedTime}</Text>
            </Div>
            <Div
                style={[
                    Style.row,
                    Style.row_between,
                    Style.column_center,
                    Style.m_t_1,
                ]}
            >
                {_.has(delivery, "fee") && (
                    <Div style={[Style.v_center]}>
                        <Text style={[Style.f_size_13, Style.f_color_dark]}>
                            {symbol}
                            {Currency(delivery.fee || 0).value}
                        </Text>
                        <Text style={[Style.f_size_13]}>
                            {trans("deliveryFee")}
                        </Text>
                    </Div>
                )}
                {_.has(delivery, "tip") && (
                    <Div style={[Style.v_center]}>
                        <Text style={[Style.f_size_13, Style.f_color_dark]}>
                            {symbol}
                            {Currency(delivery.tip || 0).value}
                        </Text>
                        <Text style={[Style.f_size_13]}>
                            {trans("deliveryTip")}
                        </Text>
                    </Div>
                )}
                {(_.has(delivery, "fee") || _.has(delivery, "tip")) && (
                    <Div style={[Style.v_center]}>
                        <Text style={[Style.f_size_13, Style.f_color_dark]}>
                            {symbol}
                            {
                                Currency(delivery.fee || 0).add(
                                    delivery.tip || 0
                                ).value
                            }
                        </Text>
                        <Text style={[Style.f_size_13]}>{trans("total")}</Text>
                    </Div>
                )}
                <Button
                    size="small"
                    disabled={disabled}
                    trans="delivery_start_delivery"
                    onPress={() =>
                        op({
                            delivery: delivery.id,
                            deliver: deliver.id,
                            status: "in_delivery",
                        })
                    }
                />
            </Div>
        </Div>
    );
};

export default ReceivedItem;
