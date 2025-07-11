import React, { FC } from "react";
import _ from "lodash";
import moment from "moment";
import Currency from "currency.js";

import CurrencyModel from "model/currency";

import Lib from "helpers/lib";

import Div from "components/div";
import Text from "components/text";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ReceivedItem: FC<Props> = (props) => {
    const { delivery, onClick } = props;

    const currency = _.toLower(_.get(delivery, "currency"));
    const symbol = _.get(CurrencyModel, `code.${_.toUpper(currency)}.symbol`);
    const deliveredTime = moment(_.get(delivery, "deliveredTime")).format(
        "YYYY-MM-DD HH:mm"
    );

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
                <Text style={[Style.f_size_13]}>{`#${Lib.chunkStr(
                    delivery.serial,
                    4
                )}`}</Text>
                <Text style={[Style.f_size_13, Style.f_color_dark]}>
                    {deliveredTime}
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
            </Div>
        </Div>
    );
};

export default ReceivedItem;
