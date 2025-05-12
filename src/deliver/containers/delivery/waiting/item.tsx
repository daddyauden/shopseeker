import React, { FC, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Currency from "currency.js";
import { message } from "antd";

import Config from "config";

import CurrencyModel from "model/currency";

import { pickupDelivery } from "deliver/request";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const WaitingItem: FC<Props> = (props) => {
    const { deliver, delivery, onClick } = props;

    const [disabled, setDisabled] = useState(false);

    const currency = _.toLower(_.get(delivery, "currency"));
    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);
    const createdTime = moment(_.get(delivery, "createdAt")).format(
        "YYYY-MM-DD HH:mm"
    );

    const op = (data) => {
        message
            .loading("", 1)
            .then(() => {
                setDisabled(true);
                return pickupDelivery(data);
            })
            .then((res) => {
                const { status } = res;

                if (status === "succeeded") {
                    onClick({
                        type: "remove",
                        payload: {
                            id: _.get(data, "delivery"),
                        },
                    });
                    message.success(trans("succeeded"), 1);
                } else if (status === "failed") {
                    message.warning(
                        trans(_.get(res, "data") ? res.data : "failed"),
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
        >
            <Div style={[Style.row, Style.row_between, Style.column_center]}>
                <Text style={[Style.f_size_13]}>{`#${Lib.chunkStr(
                    delivery.serial,
                    4
                )}`}</Text>
                <Text style={[Style.f_size_13, Style.f_color_dark]}>
                    {createdTime}
                </Text>
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
                    trans="delivery_pickup"
                    onPress={() =>
                        op({
                            deliver: deliver.id,
                            delivery: delivery.id,
                            paymentProvider: Config.PAYMENT_PROVIDER,
                        })
                    }
                />
            </Div>
        </Div>
    );
};

export default WaitingItem;
