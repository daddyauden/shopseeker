import React, { Component, createRef } from "react";
import _ from "lodash";

import { IMG_WIDTH } from "config/constant";

import { CartItem } from "interfaces/cart";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import NoResultFound from "components/no-result";
import ProductCard from "components/product-card";

import { trans } from "locales";

import Style from "style";

type Props = {
    data: any;
    onSearch: Function;
    device: any;
    [key: string]: any;
};

type State = {
    fetchLimit: number;
    containerWidth: number;
};

class Products extends Component<Props, State> {
    containerRef: any = createRef();

    state = {
        fetchLimit: 10,
        containerWidth: 0,
    };

    renderTopSales = () => {
        const { data } = this.props;

        let render: any = null;

        if (_.has(data, "topSales") && !_.isEmpty(data.topSales)) {
            const list = data.topSales;

            render = (
                <Div style={[Style.column, Style.m_b_6]}>
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_weight_600,
                            Style.p_b_3,
                        ]}
                    >
                        {trans("navlinkTopSales")}
                    </Text>
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.overflow_x_auto,
                        ]}
                    >
                        <Div style={[Style.row]}>
                            {_.map(list, (item: CartItem, _index: number) => (
                                <Div
                                    key={_index}
                                    style={[
                                        Style.column,
                                        Style.m_r_4,
                                        {
                                            width: IMG_WIDTH + 30,
                                        },
                                    ]}
                                >
                                    <ProductCard
                                        item={item}
                                        showMerchant={false}
                                    />
                                </Div>
                            ))}
                        </Div>
                    </Div>
                </Div>
            );
        }

        return render;
    };

    renderCoupons = () => {
        const { data } = this.props;

        let render: any = null;

        if (_.has(data, "coupons") && !_.isEmpty(data.coupons)) {
            const list = data.coupons;

            render = (
                <Div style={[Style.column, Style.m_b_6]}>
                    <Text
                        style={[
                            Style.f_size_15,
                            Style.f_weight_600,
                            Style.p_b_3,
                        ]}
                    >
                        {trans("navlinkDiscount")}
                    </Text>
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.overflow_x_auto,
                        ]}
                    >
                        <Div style={[Style.row]}>
                            {_.map(list, (item: CartItem, _index: number) => (
                                <Div
                                    key={_index}
                                    style={[
                                        Style.column,
                                        Style.m_r_4,
                                        {
                                            width: IMG_WIDTH + 30,
                                        },
                                    ]}
                                >
                                    <ProductCard
                                        item={item}
                                        showMerchant={false}
                                    />
                                </Div>
                            ))}
                        </Div>
                    </Div>
                </Div>
            );
        }

        return render;
    };

    renderProductsGroupByCategory = () => {
        const { data, onSearch } = this.props;
        const { fetchLimit } = this.state;

        let render: any = null;

        if (_.has(data, "products") && !_.isEmpty(data.products)) {
            const _data = _.values(
                _.reduce(
                    data.products,
                    (res, product: CartItem) => {
                        const { category } = product;

                        if (!_.isNil(category) && _.has(category, "id")) {
                            if (!_.has(res, category.id)) {
                                res[category.id] = {
                                    ...category,
                                    products: [product],
                                };
                            } else {
                                res[category.id]["products"].push(product);
                            }
                        }

                        return res;
                    },
                    {}
                )
            );

            render = _.map(
                _.orderBy(_.values(_data), ["sequence"], ["desc"]),
                (
                    categoryWithProducts: {
                        id: string;
                        title: string;
                        products: CartItem[];
                    },
                    index: number
                ) => {
                    const { id, title, products } = categoryWithProducts;

                    const hasMore = _.size(products) > fetchLimit;
                    const list = hasMore
                        ? _.slice(products, 0, fetchLimit)
                        : products;

                    return (
                        <Div key={index} style={[Style.column, Style.m_b_6]}>
                            <Div
                                style={[
                                    Style.w_p100,
                                    Style.row,
                                    Style.column_center,
                                    Style.row_between,
                                    Style.p_b_3,
                                ]}
                            >
                                <Text
                                    style={[
                                        Style.f_size_15,
                                        Style.f_weight_600,
                                    ]}
                                >
                                    {_.upperFirst(title)}
                                </Text>
                                {hasMore && (
                                    <A
                                        style={[Style.h_center]}
                                        onPress={() => onSearch({ id, title })}
                                    >
                                        <Text
                                            style={[
                                                Style.f_size_13,
                                                Style.f_color_primary,
                                                Style.f_weight_500,
                                                Style.m_r_1,
                                            ]}
                                        >
                                            {trans("more")}
                                        </Text>
                                        <Icon
                                            name="chevron-forward-outline"
                                            size={Style.f_size_30.fontSize}
                                            color={Style.f_color_primary.color}
                                        />
                                    </A>
                                )}
                            </Div>
                            <Div
                                style={[
                                    Style.row,
                                    Style.column_center,
                                    Style.overflow_x_auto,
                                ]}
                            >
                                <Div style={[Style.row]}>
                                    {_.map(
                                        list,
                                        (item: CartItem, _index: number) => (
                                            <Div
                                                key={_index}
                                                style={[
                                                    Style.column,
                                                    Style.m_r_4,
                                                    {
                                                        width: IMG_WIDTH + 30,
                                                    },
                                                ]}
                                            >
                                                <ProductCard
                                                    item={item}
                                                    showMerchant={false}
                                                />
                                            </Div>
                                        )
                                    )}
                                </Div>
                            </Div>
                        </Div>
                    );
                }
            );
        }

        return render;
    };

    render() {
        const { data } = this.props;

        if (!_.has(data, "products") || _.isEmpty(data.products)) {
            return <NoResultFound />;
        }

        return (
            <Div ref={this.containerRef} style={[Style.column, Style.p_l_4]}>
                {this.renderTopSales()}
                {this.renderCoupons()}
                {this.renderProductsGroupByCategory()}
            </Div>
        );
    }
}

export default Products;
