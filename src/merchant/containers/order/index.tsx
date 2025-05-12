import React, { useState } from "react";
import _ from "lodash";
import { NetworkStatus } from "@apollo/client";

import { HEADER_BAR_HEIGHT, IS_MOBILE } from "config/constant";

import { Order } from "interfaces/cart";

import { useQueryMore } from "helpers/apollo";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";
import Select from "components/select";
import Loading from "components/loading";
import NoResultFound from "components/no-result";

import { trans } from "locales";

import Style from "style";

import { MORE_ORDERS } from "merchant/graphql/query";

import { useMerchant } from "merchant/contexts/app";

import OrderItem from "./item";

const OrderPage = () => {
    const { merchant } = useMerchant();

    const [paymentStatus, setPaymentStatus] = useState("");

    const [sort] = useState("createdAt:desc");

    const where: { [key: string]: any } = {
        merchant: merchant.id,
        payment_null: false,
        status: "picked",
        paymentStatus_in: ["succeeded", "failed", "canceled"],
    };

    if (paymentStatus) {
        _.set(where, "paymentStatus", paymentStatus);
    } else {
        delete where.paymentStatus;
    }

    const condition = {
        sort,
        where,
    };

    const { data, error, loading, fetchMore, networkStatus } = useQueryMore(
        MORE_ORDERS,
        condition
    );

    const loadingMore = networkStatus === NetworkStatus.fetchMore;

    const handleLoadMore = () => {
        fetchMore({
            variables: {
                offset: _.toNumber(data.moreOrders.items.length),
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;

                return {
                    moreOrders: {
                        __typename: previousResult.moreOrders.__typename,
                        items: [
                            ...previousResult.moreOrders.items,
                            ...fetchMoreResult.moreOrders.items,
                        ],
                        hasMore: fetchMoreResult.moreOrders.hasMore,
                    },
                };
            },
        });
    };

    const statusOptions = [
        { value: "", label: trans("input_payment_status") },
        { value: "succeeded", label: trans("order_status_succeeded") },
        { value: "failed", label: trans("order_status_failed") },
        { value: "cancelled", label: trans("order_status_cancelled") },
    ];

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
                        height: HEADER_BAR_HEIGHT,
                    },
                ]}
            >
                <Select
                    options={statusOptions}
                    onChange={({ value }) => setPaymentStatus(value)}
                    value={paymentStatus}
                />
            </Div>

            {loading && !loadingMore ? (
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
            ) : _.isEmpty(_.get(data, "moreOrders.items", [])) ? (
                <Div style={[Style.v_center, Style.h_p100]}>
                    <NoResultFound />
                </Div>
            ) : (
                <Div
                    style={[
                        Style.h_p100,
                        Style.overflow_y_auto,
                        {
                            paddingTop: HEADER_BAR_HEIGHT,
                        },
                    ]}
                >
                    {_.map(data.moreOrders.items, (item: Order) => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                    <Button
                        size="small"
                        trans="loadMoreBtn"
                        loading={loadingMore}
                        onPress={handleLoadMore}
                        disabled={!_.get(data, "moreOrders.hasMore", false)}
                        style={[Style.m_v_4, Style.border_round_1]}
                    />
                </Div>
            )}
        </Div>
    );
};

export default OrderPage;
