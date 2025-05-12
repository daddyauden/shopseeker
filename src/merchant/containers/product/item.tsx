import React, { FC, useCallback } from "react";
import _ from "lodash";

import { IMG_HEIGHT } from "config/constant";

import Div from "components/div";
import Text from "components/text";
import Image from "components/image";

import { useDrawer } from "merchant/contexts/drawer";

import Style from "style";

interface Props {
    [key: string]: any;
}

const ProductItem: FC<Props> = ({ currency, item, callback }) => {
    const { openDrawer } = useDrawer();

    const postHandler = useCallback(() => {
        openDrawer({
            template: "product_update",
            data: item,
            direction: "right",
            closeCallback: callback,
        });
    }, []);

    const { title, image, measure, measureUnit, price, salePrice } = item;

    const discountInPercent = salePrice
        ? _.round(((price - salePrice) / price) * 100, 2)
        : null;

    return (
        <Div
            onClick={postHandler}
            style={[Style.w_p100, Style.h_p100, Style.p_3, Style.bg_color_15]}
        >
            <Div style={[Style.position_relative]}>
                <Div
                    style={[
                        Style.v_center,
                        Style.p_t_2,
                        { height: IMG_HEIGHT },
                    ]}
                >
                    <Image
                        src={_.get(image, "formats.thumbnail", image)}
                        alt={title}
                    />
                </Div>

                <Div
                    style={[
                        Style.column,
                        Style.row_end,
                        Style.column_start,
                        Style.position_relative,
                        Style.m_t_2,
                    ]}
                >
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_weight_500,
                            { height: "40px" },
                        ]}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>

                    <Text
                        style={[
                            Style.f_size_11,
                            Style.f_weight_500,
                            Style.f_color_dark,
                            Style.m_t_1,
                        ]}
                    >
                        {measure} {measureUnit}
                    </Text>

                    <Div
                        style={[
                            Style.row,
                            Style.row_between,
                            Style.column_center,
                            Style.m_t_1,
                        ]}
                    >
                        <Div
                            style={[
                                Style.row,
                                Style.row_start,
                                Style.column_center,
                            ]}
                        >
                            <Text
                                style={[
                                    salePrice
                                        ? Style.f_size_14
                                        : Style.f_size_13,
                                    Style.f_weight_500,
                                    salePrice
                                        ? Style.f_color_first
                                        : Style.f_color_primary,
                                ]}
                            >
                                {currency}
                                {salePrice ? salePrice : price}
                            </Text>
                            {discountInPercent && (
                                <Text
                                    style={[
                                        Style.f_size_12,
                                        Style.f_weight_500,
                                        Style.f_color_dark,
                                        Style.f_style_italic,
                                        Style.linethrough,
                                        Style.m_l_2,
                                    ]}
                                >
                                    {currency}
                                    {price}
                                </Text>
                            )}
                        </Div>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default ProductItem;
