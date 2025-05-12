import React, { FC, useCallback } from "react";
import _ from "lodash";
import dayjs from "dayjs";

import CurrencyModel from "model/currency";

import { useDrawer } from "contexts/drawer";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";
import Image from "components/image";

import { trans } from "locales";

import Style from "style";

import OrderDetail from "./detail";

interface Props {
    item: any;
}

const OrderItem: FC<Props> = ({ item }) => {
    const { openDrawer } = useDrawer();

    const {
        createdAt,
        serial,
        items,
        currency,
        payment,
        merchant,
        shippingType,
    } = item;

    const timezone = _.get(merchant, "region.timezone", "America/Montreal");
    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);

    const clickHandler = useCallback(() => {
        openDrawer({
            template: <OrderDetail item={item} />,
            direction: "right",
        });
    }, []);

    return (
        <Div
            style={[
                Style.row,
                Style.column_start,
                Style.shadow_all,
                Style.border_round_1,
                Style.p_3,
            ]}
            onClick={clickHandler}
        >
            {_.get(merchant, "logo.url") && (
                <Div
                    style={[
                        Style.h_center,
                        Style.overflow_hidden,
                        Style.b_img,
                        {
                            width: "50px",
                            height: "50px",
                            borderRadius: "25px",
                        },
                    ]}
                >
                    <Image
                        src={_.get(merchant, "logo.url")}
                        alt={_.get(merchant, "name", "")}
                        layout="responsive"
                    />
                </Div>
            )}

            <Div style={[Style.flex, Style.column, Style.m_l_3]}>
                <Div
                    style={[Style.row, Style.column_center, Style.row_between]}
                >
                    <Text style={[Style.f_size_13, Style.f_weight_500]}>
                        {_.get(merchant, "name", trans("deliverySource"))}
                    </Text>
                    {shippingType && (
                        <Text style={[Style.f_size_11, Style.f_color_dark]}>
                            {trans(`shippingType_${shippingType}`)}
                        </Text>
                    )}
                </Div>
                <Div
                    style={[
                        Style.row,
                        Style.column_center,
                        Style.row_between,
                        Style.m_t_2,
                    ]}
                >
                    <Div style={[Style.column]}>
                        {serial && (
                            <Div style={[Style.row, Style.column_center]}>
                                <Text
                                    style={[
                                        Style.f_size_10,
                                        Style.f_color_dark,
                                        Style.m_r_1,
                                    ]}
                                >
                                    {trans("orderSerial")}
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_11,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    {`#${Lib.chunkStr(serial, 4)}`}
                                </Text>
                            </Div>
                        )}

                        {createdAt && (
                            <Div
                                style={[
                                    Style.row,
                                    Style.column_center,
                                    Style.m_t_1,
                                ]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_10,
                                        Style.f_color_dark,
                                        Style.m_r_1,
                                    ]}
                                >
                                    {trans("orderCreatedTime")}
                                </Text>
                                <Text
                                    style={[
                                        Style.f_size_11,
                                        Style.f_color_dark,
                                    ]}
                                >
                                    {dayjs(createdAt, timezone).format(
                                        "YYYY-MM-DD HH:mm"
                                    )}
                                </Text>
                            </Div>
                        )}
                    </Div>
                    <Div style={[Style.v_center]}>
                        {_.has(payment, "amount") && (
                            <Text style={[Style.f_size_15, Style.f_weight_500]}>
                                {`${symbol}${_.get(payment, "amount")}`}
                            </Text>
                        )}
                        <Text style={[Style.f_size_10, Style.f_color_dark]}>
                            {`(${_.size(items)} ${trans(
                                _.size(items) > 1 ? "items" : "item"
                            )})`}
                        </Text>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default OrderItem;
