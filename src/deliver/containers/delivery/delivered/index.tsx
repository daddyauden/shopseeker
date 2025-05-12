import React, { FC } from "react";
import _ from "lodash";
import { NetworkStatus } from "@apollo/client";

import { useDeliver } from "deliver/contexts/app";
import { useDrawer } from "deliver/contexts/drawer";

import { useQueryMore } from "helpers/apollo";
import { DELIVERED_DELIVERIES } from "deliver/graphql/query";

import Div from "components/div";
import Text from "components/text";
import Button from "components/button";
import Divider from "components/divider";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import ErrorMessage from "components/error-message";

import DeliveryList from "./list";

import { trans } from "locales";

import Style from "style";

type Props = {
    [key: string]: any;
};

const DeliveredDelivery: FC<Props> = () => {
    const { deliver } = useDeliver();
    const { openDrawer } = useDrawer();

    const { data, error, loading, fetchMore, networkStatus } = useQueryMore(
        DELIVERED_DELIVERIES,
        {
            deliver: deliver.id,
        }
    );

    const loadingMore = networkStatus === NetworkStatus.fetchMore;

    if (loading && !loadingMore) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Loading />
            </Div>
        );
    }

    if (error) return <ErrorMessage message={error.message} />;

    if (_.isEmpty(_.get(data, "moreDeliveries.items", []))) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    const handleLoadMore = () => {
        fetchMore({
            variables: {
                offset: _.toNumber(data.moreDeliveries.items.length),
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;

                return {
                    moreDeliveries: {
                        __typename: previousResult.moreDeliveries.__typename,
                        items: [
                            ...previousResult.moreDeliveries.items,
                            ...fetchMoreResult.moreDeliveries.items,
                        ],
                        hasMore: fetchMoreResult.moreDeliveries.hasMore,
                    },
                };
            },
        });
    };

    const handleClick = (data) => {
        openDrawer({
            template: "delivery_detail",
            data,
            direction: "right",
        });
    };

    return (
        <Div style={[Style.column]}>
            <DeliveryList
                deliveries={data.moreDeliveries.items}
                onClick={handleClick}
            />

            {_.get(data, "moreDeliveries.hasMore", false) ? (
                <Button
                    size="small"
                    trans="loadMoreBtn"
                    loading={loadingMore}
                    onPress={handleLoadMore}
                    disabled={!_.get(data, "moreDeliveries.hasMore", false)}
                />
            ) : (
                <Div style={[Style.h_center, Style.p_h_3]}>
                    <Divider dashed={true}>
                        <Text style={[Style.f_size_13]}>{trans("end")}</Text>
                    </Divider>
                </Div>
            )}
        </Div>
    );
};

export default DeliveredDelivery;
