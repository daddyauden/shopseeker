import React, { FC } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { getMerchant } from "merchant/request";

import Shop from "containers/shop";

import { SHOP_DETAIL } from "graphql/query";

type Props = {
    [key: string]: any;
};

const ShopPage: FC<Props> = (props) => {
    return <Shop {...props} />;
};

export const getServerSideProps = async ({ query }) => {
    const id = _.get(query, "id", "");
    let shop = {};

    if (id) {
        const { data, errors } = await getMerchant({
            query: SHOP_DETAIL,
            variables: { id },
        });

        if (_.isNil(errors) && !_.isEmpty(_.get(data, "merchant", {}))) {
            shop = _.get(data, "merchant");
        }
    }

    return {
        props: {
            shop,
        },
    };
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
        location: state.system.location,
        config: state.system.config,
    };
};

export default connect(mapStateToProps)(ShopPage);
