import React, { FC } from "react";
import _ from "lodash";

import CurrencyModel from "model/currency";

import { IMG_HEIGHT } from "config/constant";

import { CartItem } from "interfaces/cart";

import Div from "components/div";
import Text from "components/text";
import Image from "components/image";

import { trans } from "locales";

import Style from "style";

interface Props {
    item: CartItem;
    style?: any[];
}

const CardColumn: FC<Props> = ({ item, style = [] }) => {
    const { title, measure, measureUnit, price, salePrice, hasTax } = item;

    const currency = _.get(
        CurrencyModel,
        `code.${_.toUpper(item.merchant.region.currency)}.symbol`
    );

    const hasSalePrice = !_.isNil(salePrice) && _.toNumber(salePrice) > 0;

    return (
        <Div style={[Style.column, Style.row_between, Style.h_p100, ...style]}>
            <Div style={[Style.v_center, { height: IMG_HEIGHT }]}>
                <Image src={_.get(item, "image")} layout="intrinsic" />
            </Div>

            <Text
                style={[Style.f_size_13, Style.f_weight_500, Style.m_t_2]}
                numberOfLines={2}
            >
                {_.isNil(hasTax) ||
                    (!hasTax && (
                        <Text
                            style={[
                                Style.f_size_10,
                                Style.f_weight_500,
                                Style.f_color_first,
                                Style.m_r_1,
                            ]}
                        >
                            {trans("freeTax")}
                        </Text>
                    ))}
                {title}
            </Text>

            {hasSalePrice && (
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_color_dark,
                        Style.linethrough,
                        Style.m_t_1,
                    ]}
                >
                    {currency}
                    {price}
                </Text>
            )}

            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.row_start,
                    Style.column_center,
                    hasSalePrice ? Style.m_t_1 : Style.m_t_5,
                ]}
            >
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_weight_500,
                        hasSalePrice
                            ? Style.f_color_first
                            : Style.f_color_primary,
                    ]}
                >
                    {currency}
                    {hasSalePrice ? salePrice : price}
                </Text>
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_weight_500,
                        Style.f_color_dark,
                        Style.m_h_1,
                    ]}
                >
                    {"/"}
                </Text>
                <Text
                    style={[
                        Style.f_size_13,
                        Style.f_weight_500,
                        Style.f_color_dark,
                    ]}
                >
                    {measure} {trans(`measure_unit_${_.toUpper(measureUnit)}`)}
                </Text>
            </Div>
        </Div>
    );
};

export default CardColumn;
