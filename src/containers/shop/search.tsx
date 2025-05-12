import React, { FC, useState } from "react";
import _ from "lodash";
import { NetworkStatus } from "@apollo/client";

import { CartItem } from "interfaces/cart";
import { Router } from "interfaces/router";

import { HEADER_BAR_HEIGHT, FOOTER_BAR_HEIGHT } from "config/constant";

import { useQueryMore } from "helpers/apollo";
import { SEARCH_PRODUCTS } from "graphql/query";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Button from "components/button";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import ProductCard from "components/product-card";

import HeaderBar from "containers/bar/header-bar";

import { trans } from "locales";

import Style from "style";

type Props = {
    router: Router;
    [key: string]: any;
};

const ShopSearchPage: FC<Props> = (props) => {
    const { device, router, shop } = props;

    const [popup, setPopup] = useState(false);

    const [sort, changeSort] = useState<string>(
        _.get(router, "params.sort", "createdAt:desc")
    );

    const where = _.get(router, "params.where", {});

    const condition = {
        sort,
        where: {
            ...where,
            merchant: shop.id,
        },
    };

    const headerLeft = _.get(router, "header.headerLeft");
    const headerTitle = _.get(router, "header.headerTitle");
    const headerRight = _.get(
        router,
        "header.headerRight",
        <Div style={[Style.p_l_4, Style.p_r_2]}>
            <A onPress={() => setPopup(!popup)}>
                <Icon
                    name="options-outline"
                    size={Style.f_size_20.fontSize}
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

    const headerBar = (
        <HeaderBar
            headerLeft={headerLeft}
            headerTitle={headerTitle}
            headerRight={headerRight}
            style={[Style.bg_color_15, Style.b_b_light_medium]}
        />
    );

    const { data, error, fetchMore, networkStatus } = useQueryMore(
        SEARCH_PRODUCTS,
        condition
    );

    const loadingMore = networkStatus === NetworkStatus.fetchMore;

    if (
        (networkStatus === NetworkStatus.loading ||
            networkStatus === NetworkStatus.setVariables ||
            networkStatus === NetworkStatus.ready) &&
        (!data || _.isEmpty(data))
    ) {
        return (
            <Div
                style={[
                    Style.column,
                    Style.bg_color_light,
                    { paddingTop: HEADER_BAR_HEIGHT },
                ]}
            >
                {headerBar}
                <Div style={[Style.v_center, Style.h_100]}>
                    <Loading />
                </Div>
            </Div>
        );
    }

    if (error) {
        return (
            <Div
                style={[
                    Style.column,
                    Style.bg_color_light,
                    { paddingTop: HEADER_BAR_HEIGHT },
                ]}
            >
                {headerBar}
                <Div style={[Style.p_h_4]}>
                    <Text>{trans("error.unknown")}</Text>
                </Div>
            </Div>
        );
    }

    if (_.isEmpty(_.get(data, "moreProducts.items", []))) {
        return (
            <Div
                style={[
                    Style.column,
                    Style.bg_color_light,
                    { paddingTop: HEADER_BAR_HEIGHT },
                ]}
            >
                {headerBar}
                <Div
                    style={[Style.v_center, Style.h_100, Style.bg_color_light]}
                >
                    <NoResultFound />
                </Div>
            </Div>
        );
    }

    const handleLoadMore = () => {
        if (_.get(data, "moreProducts.hasMore") === true) {
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
        }
    };

    const { xl, lg } = device;

    let colWidth: string = "50%";

    if (xl) {
        colWidth = "25%";
    } else if (lg) {
        colWidth = "33.3333333%";
    }

    return (
        <Div
            style={[
                Style.column,
                {
                    paddingTop: HEADER_BAR_HEIGHT,
                    paddingBottom: FOOTER_BAR_HEIGHT,
                },
            ]}
        >
            {headerBar}

            <Div
                style={[
                    Style.w_p100,
                    Style.row,
                    Style.wrap,
                    Style.p_l_3,
                    Style.p_v_3,
                ]}
            >
                {_.map(
                    data.moreProducts.items,
                    (item: CartItem, index: number) => (
                        <Div
                            key={index}
                            style={[
                                Style.v_center,
                                Style.p_r_3,
                                Style.p_b_3,
                                { width: `${colWidth}` },
                            ]}
                        >
                            <ProductCard item={item} showMerchant={false} />
                        </Div>
                    )
                )}
            </Div>

            <Div style={[Style.w_p100, Style.v_center]}>
                <Button
                    size="small"
                    trans="loadMoreBtn"
                    loading={loadingMore}
                    disabled={!_.get(data, "moreProducts.hasMore", false)}
                    onPress={handleLoadMore}
                    style={[Style.m_v_4]}
                />
            </Div>
        </Div>
    );
};

export default ShopSearchPage;
