import React, { FC } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { CartItem } from "interfaces/cart";

import { goToShop } from "utils/navigation";

import Div from "components/div";
import Image from "components/image";
import PlusMinus from "components/product-plus-minus";

import ProductCardColumn from "./column";

import Style from "style";

interface Props {
    item: CartItem;
    showMerchant?: boolean;
    showCounter?: boolean;
    style?: any[];
}

const ProductCard: FC<Props> = ({
    item,
    showMerchant = true,
    showCounter = true,
    style = [],
}) => {
    const showHeader = showMerchant && _.has(item, "merchant");

    const _goToShop = (item: CartItem) => goToShop(item.merchant.id);

    return (
        <Div
            style={[
                Style.position_relative,
                Style.column,
                Style.h_p100,
                ...style,
            ]}
        >
            {showHeader && (
                <Div
                    style={[
                        Style.row,
                        Style.row_between,
                        Style.column_center,
                        Style.w_p100,
                        { height: "30px" },
                    ]}
                >
                    {_.get(item, "merchant.logo.url") && (
                        <Div
                            onClick={() => _goToShop(item)}
                            style={[
                                Style.h_center,
                                Style.overflow_hidden,
                                {
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "15px",
                                },
                            ]}
                        >
                            <Image
                                src={_.get(item, "merchant.logo")}
                                layout="intrinsic"
                            />
                        </Div>
                    )}
                </Div>
            )}

            <ProductCardColumn
                item={item}
                style={[{ marginTop: showHeader ? "30px" : "0px" }]}
            />

            {showCounter && <PlusMinus item={item} />}
        </Div>
    );
};

ProductCard.defaultProps = {
    showMerchant: true,
    showCounter: true,
};

const mapStateToProps = (state) => {
    const config = state.system.config;

    return {
        showCounter: _.get(config, "miniCheckoutMode", "full") !== "simple",
    };
};

export default connect(mapStateToProps)(ProductCard);
