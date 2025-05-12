import React, { FC } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { getMerchant } from "merchant/request";

import Corp from "containers/corp";
import Shop from "containers/shop";

import { SHOP_DETAIL } from "graphql/query";

type Props = {
    [key: string]: any;
};

const IndexPage: FC<Props> = (props) => {
    if (_.isEmpty(props.shop)) {
        return <Corp device={props.device} />;
    }

    return <Shop {...props} />;
};

export const getServerSideProps = async ({ req }) => {
    let shop = {};

    if (!_.startsWith(req.headers.host, process.env.DOMAIN)) {
        const wildcard = _.trimEnd(req.headers.host, `.${process.env.DOMAIN}`);

        if (_.startsWith(wildcard, "shop-")) {
            const shopId = _.trimStart(wildcard, "shop-");

            if (shopId) {
                const { data, errors } = await getMerchant({
                    query: SHOP_DETAIL,
                    variables: { id: shopId },
                });

                if (
                    _.isNil(errors) &&
                    !_.isEmpty(_.get(data, "merchant", {}))
                ) {
                    shop = _.get(data, "merchant");
                }
            }
        }
    }

    return {
        props: { shop },
    };
};

const mapStateToProps = (state) => {
    return {
        locale: state.system.locale,
        location: state.system.location,
        config: state.system.config,
    };
};

export default connect(mapStateToProps)(IndexPage);
