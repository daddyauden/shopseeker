import React, { FC } from "react";
import _ from "lodash";

import { Nav } from "interfaces/nav";
import { Item } from "interfaces/cart";
import { Router } from "interfaces/router";

import { useQuery } from "helpers/apollo";

import A from "components/a";
import Div from "components/div";
import Icon from "components/icon";
import Text from "components/text";
import Loading from "components/loading";
import NoResultFound from "components/no-result";

import { trans } from "locales";

import Style from "style";

import { SHOP_EXPLORE } from "graphql/query";

type Props = {
    router: Router;
    changeRouter: (router: Router) => void;
    [key: string]: any;
};

const ShopExplorePage: FC<Props> = (props) => {
    const { shop, changeRouter } = props;

    const condition = {
        merchant: shop.id,
    };

    const { data, error, loading } = useQuery(SHOP_EXPLORE, condition);

    if (loading) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Loading />
            </Div>
        );
    }

    if (error) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <Div style={[Style.p_h_4]}>
                    <Text>{trans("error.unknown")}</Text>
                </Div>
            </Div>
        );
    }

    if (!_.has(data, "products") || _.isEmpty(data.products)) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    const categories = _.values(
        _.reduce(
            data.products,
            (res, product: Item) => {
                const { category } = product;

                if (!_.isNil(category) && _.has(category, "id")) {
                    if (!_.has(res, category.id)) {
                        res[category.id] = category;
                    }
                }

                return res;
            },
            {}
        )
    );

    if (_.isEmpty(categories)) {
        return (
            <Div style={[Style.v_center, Style.h_p100]}>
                <NoResultFound />
            </Div>
        );
    }

    const onPress = (category) =>
        changeRouter({
            route: "search",
            params: {
                where: {
                    category: category.id,
                    merchant: shop.id,
                    status: "online",
                },
            },
            header: {
                headerLeft: (
                    <A
                        style={[Style.h_center]}
                        onPress={() =>
                            changeRouter({
                                route: "explore",
                            })
                        }
                    >
                        <Icon
                            name="chevron-back"
                            size={Style.f_size_15.fontSize}
                            color={Style.f_color_dark_medium.color}
                        />
                        <Text
                            style={[
                                Style.f_size_15,
                                Style.f_color_dark_medium,
                                Style.f_weight_500,
                                Style.m_l_1,
                            ]}
                        >
                            {trans("back")}
                        </Text>
                    </A>
                ),
                headerTitle: category.title,
            },
        });

    return (
        <Div style={[Style.row, Style.wrap, Style.w_p100, Style.p_2]}>
            {_.map(categories, (category: Nav, index: number) => (
                <Div
                    key={index}
                    style={[Style.w_p50, Style.p_2]}
                    onClick={() => onPress(category)}
                >
                    <Div
                        style={[
                            Style.column,
                            Style.column_start,
                            Style.row_end,
                            Style.border_round_2,
                            Style.shadow_all,
                            Style.p_3,
                        ]}
                    >
                        <Text style={[Style.f_size_13, Style.f_weight_600]}>
                            {category.title}
                        </Text>
                    </Div>
                </Div>
            ))}
        </Div>
    );
};

export default ShopExplorePage;
