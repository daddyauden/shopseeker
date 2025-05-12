import React, { useState, useCallback } from "react";
import _ from "lodash";
import { NetworkStatus } from "@apollo/client";

import {
    HEADER_BAR_HEIGHT,
    FOOTER_BAR_HEIGHT,
    IS_MOBILE,
} from "config/constant";

import CurrencyModel from "model/currency";

import { Nav } from "interfaces/nav";
import { Item } from "interfaces/cart";

import { useQueryMore } from "helpers/apollo";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Select from "components/select";
import Button from "components/button";
import Loading from "components/loading";
import NoResultFound from "components/no-result";

import { trans } from "locales";

import Style from "style";

import ProductItem from "merchant/containers/product/item";

import { MORE_PRODUCTS } from "merchant/graphql/query";

import { useMerchant } from "merchant/contexts/app";
import { useDrawer } from "merchant/contexts/drawer";

const ProductPage = () => {
    const { merchant } = useMerchant();

    const { openDrawer } = useDrawer();

    const addProduct = useCallback(() => {
        openDrawer({
            template: "product_add",
            direction: "right",
            data: null,
        });
    }, []);

    const [category, setCategory] = useState("");

    const [popup, setPopup] = useState(false);
    const [sort, changeSort] = useState("createdAt:desc");

    const headerRight = (
        <Div style={[Style.p_l_4, Style.p_r_2]}>
            <A onPress={() => setPopup(!popup)}>
                <Icon
                    name="options-outline"
                    size={Style.f_size_25.fontSize}
                    color={Style.f_color_dark_medium.color}
                />
            </A>
            {popup && (
                <Div
                    style={[
                        Style.bg_color_15,
                        Style.shadow_all,
                        Style.border_round_1,
                        Style.p_2,
                        Style.top_right,
                        Style.z_index_5,
                        {
                            top: HEADER_BAR_HEIGHT,
                        },
                    ]}
                >
                    <A
                        style={[Style.v_center, Style.p_h_2, Style.p_v_1]}
                        onPress={() => {
                            changeSort("price:asc");
                            setPopup(!popup);
                        }}
                    >
                        <Text style={[Style.f_size_13, Style.f_weight_500]}>
                            {trans("priceLTH")}
                        </Text>
                    </A>
                    <A
                        style={[Style.v_center, Style.p_h_2, Style.p_v_1]}
                        onPress={() => {
                            changeSort("price:desc");
                            setPopup(!popup);
                        }}
                    >
                        <Text style={[Style.f_size_13, Style.f_weight_500]}>
                            {trans("priceHTL")}
                        </Text>
                    </A>
                </Div>
            )}
        </Div>
    );

    const where: { [key: string]: any } = {
        merchant: merchant.id,
    };

    if (category) {
        _.set(where, "category", category);
    } else {
        delete where.category;
    }

    const condition = {
        sort,
        where,
    };

    const { data, error, loading, fetchMore, networkStatus, refetch } =
        useQueryMore(MORE_PRODUCTS, condition);

    const loadingMore = networkStatus === NetworkStatus.fetchMore;
    const refetching = networkStatus === NetworkStatus.refetch;

    const handleLoadMore = () => {
        fetchMore({
            variables: {
                offset: _.toNumber(data.moreProducts.items.length),
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;

                return {
                    moreProducts: {
                        __typename: previousResult.moreProducts.__typename,
                        items: [
                            ...previousResult.moreProducts.items,
                            ...fetchMoreResult.moreProducts.items,
                        ],
                        hasMore: fetchMoreResult.moreProducts.hasMore,
                    },
                };
            },
        });
    };

    const symbol = _.get(
        CurrencyModel,
        `country.${_.toUpper(merchant.region.country)}.symbol`
    );

    const categoriesOptions = _.reduce(
        _.get(merchant, "categories", []),
        (res: any[], category: Nav) => {
            res.push({
                value: category.id,
                label: category.title,
            });

            return res;
        },
        [
            {
                value: "",
                label: trans("input_category"),
            },
        ]
    );

    return (
        <Div style={[Style.column, Style.row_center, Style.h_p100]}>
            <Div
                style={[
                    Style.row,
                    Style.row_start,
                    Style.column_center,
                    Style.w_p100,
                    Style.bg_color_15,
                    Style.shadow_bottom,
                    Style.p_h_2,
                    IS_MOBILE
                        ? Style.fixed_top_horizontal
                        : Style.top_horizontal,
                    {
                        zIndex: 5,
                        height: HEADER_BAR_HEIGHT,
                        top: "50px",
                    },
                ]}
            >
                <Select
                    placeholder={trans("input_category")}
                    options={categoriesOptions}
                    onChange={({ value }) => setCategory(value)}
                />
                {headerRight}
            </Div>

            {loading && !loadingMore && !refetching ? (
                <Div style={[Style.v_center, Style.h_p100]}>
                    <Loading />
                </Div>
            ) : error ? (
                <Div style={[Style.p_3]}>
                    <Text
                        style={[
                            Style.f_size_13,
                            Style.f_color_danger,
                            Style.f_weight_500,
                        ]}
                    >
                        {error.message}
                    </Text>
                </Div>
            ) : _.isEmpty(_.get(data, "moreProducts.items", [])) ? (
                <Div style={[Style.v_center, Style.h_p100]}>
                    <NoResultFound />
                </Div>
            ) : (
                <Div
                    style={[
                        Style.h_p100,
                        Style.overflow_y_auto,
                        {
                            paddingTop: HEADER_BAR_HEIGHT + 50,
                        },
                    ]}
                >
                    <Div
                        style={[
                            Style.row,
                            Style.column_center,
                            Style.row_start,
                            Style.wrap,
                        ]}
                    >
                        {_.map(
                            data.moreProducts.items,
                            (item: Item, index: number) => (
                                <Div
                                    key={index}
                                    style={[
                                        {
                                            width: IS_MOBILE ? "33.33%" : "25%",
                                        },
                                    ]}
                                >
                                    <ProductItem
                                        key={item.id}
                                        item={item}
                                        currency={symbol}
                                        callback={refetch}
                                    />
                                </Div>
                            )
                        )}
                    </Div>

                    <Button
                        size="small"
                        trans="loadMoreBtn"
                        loading={loadingMore}
                        onPress={handleLoadMore}
                        disabled={!_.get(data, "moreProducts.hasMore", false)}
                        style={[Style.m_v_4, Style.border_round_1]}
                    />
                </Div>
            )}

            <A
                onPress={addProduct}
                style={[
                    Style.v_center,
                    Style.bg_color_15,
                    Style.shadow_all,
                    Style.position_fixed,
                    Style.z_index_5,
                    {
                        right: 20,
                        bottom: FOOTER_BAR_HEIGHT + 20,
                        width: "50px",
                        height: "50px",
                        borderRadius: "25px",
                    },
                ]}
            >
                <Icon
                    name="add"
                    size={Style.f_size_30.fontSize}
                    color={Style.f_color_primary.color}
                />
            </A>
        </Div>
    );
};

export default ProductPage;
