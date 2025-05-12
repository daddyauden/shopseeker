import React, { FC, useCallback } from "react";
import _ from "lodash";
import Currency from "currency.js";
import moment from "moment-timezone";

import CurrencyModel from "model/currency";

import { Order } from "interfaces/cart";

import Lib from "helpers/lib";

import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";

import { useDrawer } from "merchant/contexts/drawer";

import { trans } from "locales";

import Style from "style";

import OrderDetail from "./detail";

interface Props {
    item: Order;
    [key: string]: any;
}

const OrderItem: FC<Props> = ({ item }) => {
    const { openDrawer } = useDrawer();

    const clickHandler = useCallback(() => {
        openDrawer({
            template: <OrderDetail item={item} />,
            direction: "right",
        });
    }, []);

    const {
        serial,
        createdAt,
        currency,
        subtotal,
        totalTax,
        discount,
        merchant,
        paymentStatus,
    } = item;

    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);

    const timezone = _.get(merchant, "region.timezone", "America/Montreal");

    const total = Currency(subtotal).add(totalTax).subtract(discount).value;

    const _paymentStatus = _.toLower(paymentStatus);

    return (
        <Div
            style={[Style.column, Style.p_3, Style.b_b_light_medium]}
            onClick={clickHandler}
        >
            <Div style={[Style.row, Style.row_between, Style.column_center]}>
                <Text
                    style={[Style.f_size_13, Style.f_weight_500]}
                >{`#${Lib.chunkStr(serial, 4)}`}</Text>
                <Text style={[Style.f_size_13]}>
                    {moment.tz(createdAt, timezone).format("YYYY-MM-DD HH:mm")}
                </Text>
            </Div>

            <Div
                style={[
                    Style.row,
                    Style.column_center,
                    Style.row_between,
                    Style.w_p100,
                    Style.m_t_2,
                ]}
            >
                <Text style={[Style.f_size_13, Style.f_color_dark]}>
                    {`${symbol}${total}`}
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_weight_500,
                            _paymentStatus === "succeeded"
                                ? Style.f_color_success
                                : _paymentStatus === "failed"
                                ? Style.f_color_danger
                                : _paymentStatus === "cancel"
                                ? Style.f_color_warning
                                : Style.f_color_dark,
                            Style.m_l_2,
                        ]}
                    >
                        {trans(`pay_${_paymentStatus}`)}
                    </Text>
                </Text>
                <Icon
                    name="chevron-forward"
                    size={Style.f_size_15.fontSize}
                    color={Style.f_color_dark_light.color}
                />
            </Div>
        </Div>
    );
};

export default OrderItem;
