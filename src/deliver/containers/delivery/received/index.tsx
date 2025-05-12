import React, { FC } from "react";
import _ from "lodash";

import { useDeliver } from "deliver/contexts/app";
import { useDrawer } from "deliver/contexts/drawer";

import { useQueryMore } from "helpers/apollo";
import { RECEIVED_DELIVERIES } from "deliver/graphql/query";

import Div from "components/div";
import Loading from "components/loading";
import NoResultFound from "components/no-result";
import ErrorMessage from "components/error-message";

import DeliveryList from "./list";

import Style from "style";

type Props = {
    [key: string]: any;
};

const ReceivedDelivery: FC<Props> = () => {
    const { deliver } = useDeliver();
    const { openDrawer } = useDrawer();

    const { data, error, loading } = useQueryMore(RECEIVED_DELIVERIES, {
        deliver: deliver.id,
    });

    if (loading) {
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
                deliver={deliver}
                deliveries={data.moreDeliveries.items}
                onClick={handleClick}
            />
        </Div>
    );
};

export default ReceivedDelivery;
